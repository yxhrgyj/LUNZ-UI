import {
    Directive, OnInit, AfterViewInit, Input, Output,
    ViewContainerRef, EventEmitter, ContentChild
} from '@angular/core';
import { Router } from '@angular/router';

import { DatatableComponent } from '@swimlane/ngx-datatable/release/components';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable/release/types';
import { QueryComponent } from '@zhongruigroup/ngx-query/query.component';
import { cloneQueryGroup } from '@zhongruigroup/ngx-query/utils/query-helper';

import { NgxDatatableFooterComponent } from '../components/ngx-datatable-footer/ngx-datatable-footer.component';
import { NgxDatatableActionsComponent } from '../components/ngx-datatable-actions/ngx-datatable-actions.component';

@Directive({
    selector: '[appNgxDataTable]',
    exportAs: 'NgxDataTableDirective'
})
export class NgxDataTableDirective implements OnInit, AfterViewInit {

    @Output() data: EventEmitter<any> = new EventEmitter();

    @Input() ngxQuery: QueryComponent;
    @Input() rowHeight = 44;
    @Input() externalPaging = true;
    @Input() saveState = true;
    @Input()
    set pageSize(val: number) {
        if (val < 1) {
            throw new Error(`The value '${val}' can't be less than 1.`);
        }

        this._pageSize = val;
        if (this._datatable) {
            this._datatable.limit = this._pageSize;
        }
    }
    get pageSize(): number {
        return this._pageSize;
    }
    @Input()
    set pageIndex(val: number) {
        if (val < 1) {
            throw new Error(`The value '${val}' can't be less than 1.`);
        }

        this._pageIndex = val;
        if (this._datatable) {
            this._datatable.offset = this._pageIndex;
        }
    }
    get pageIndex(): number {
        return this._pageIndex;
    }
    @ContentChild(NgxDatatableFooterComponent)
    footer: NgxDatatableFooterComponent;
    @ContentChild(NgxDatatableActionsComponent)
    toolbar: NgxDatatableActionsComponent;

    private _datatable: DatatableComponent;
    private _pageSize = 10;
    private _pageIndex = 1;
    private _sorts: any[] = [];
    private _tempQueryTemplates: any;

    constructor(private _view: ViewContainerRef, private router: Router) {
    }

    ngOnInit() {
        if (this.saveState === true) {
            this.loadCachePaging();
        }
        this._datatable = (<any>this._view)._data.componentView.component;
        this.initialize(this._datatable, this.ngxQuery);
    }

    ngAfterViewInit() {
        this.emitData();
    }

    public refreshData() {
        this.emitData();
    }

    private initialize(datatable: DatatableComponent, ngxQuery: QueryComponent): void {

        // datatable
        datatable.externalPaging = this.externalPaging;
        datatable.columnMode = ColumnMode.force;
        datatable.scrollbarV = false;
        datatable.rowHeight = this.rowHeight;
        datatable.headerHeight = 40;
        datatable.footerHeight = 40;
        datatable.sortType = SortType.multi;
        datatable.limit = this._pageSize;
        datatable.offset = this._pageIndex - 1;
        if (this.footer) {
            this.footer.datatable = datatable;
        }
        if (this._sorts && this._sorts.length > 0) {
            datatable.sorts = this._sorts;
        }
        datatable.messages = {
            emptyMessage: '当前无记录。',
            totalMessage: '行',
            selectedMessage: '选择'
        };

        const self = this;

        datatable.page.subscribe(function (event: any) {
            self.emitData(event);
        });

        datatable.sort.subscribe(function (event: any) {
            self.emitData(undefined, event.sorts);
        });

        // query
        if (ngxQuery) {
            ngxQuery.query.subscribe(function (event: any) {
                self._datatable.offset = 0;
                self.emitData(undefined, []);
            });

            ngxQuery.reset.subscribe(function (event: any) {
                window.setTimeout(function () {
                    self._datatable.offset = 0;
                    self.emitData(undefined, []);
                }, 100);
            });

            if (this.saveState === true) {
                ngxQuery.reset.subscribe(function (event: any) {
                    ngxQuery.queryTemplates = self._tempQueryTemplates;
                });
            }
        }
    }

    private emitData(page?: any, sorts?: any[]) {
        if (this.data) {
            // page
            if (page === undefined) {
                page = {
                    limit: this.pageSize,
                    offset: this.pageIndex - 1
                };
            } else {
                this._pageSize = page.limit;
                this._pageIndex = page.offset + 1;
            }
            // sort
            if (sorts === undefined) {
                sorts = this._datatable.sorts;
            } else {
                page.offset = 0;
                this._pageIndex = page.offset + 1;
            }
            const sortArray = [];
            for (const sort of sorts) {
                sortArray.push({
                    field: sort.prop,
                    sort: sort.dir
                });
            }
            // query
            const query = this.getQuery();

            // cache
            if (this.saveState === true) {
                const paging = {
                    pageSize: page.limit,
                    pageIndex: page.offset + 1,
                    sorts: sorts,
                    filters: query.filters,
                    rules: this.ngxQuery.getOriginalQuery().rules
                };
                sessionStorage.setItem(this.router.url + '|saveState|dt', JSON.stringify(paging));
            }
            // event
            this.data.emit({
                datatable: this._datatable,
                // event: event,
                page: {
                    pageSize: page.limit,
                    pageIndex: page.offset + 1,
                    sort: sortArray,
                    filters: query.filters,
                    filter: query.query
                },
                query: query
            });
        }
    }

    private getQuery(): any {
        const result: any = {
            filters: []
        };

        if (this.ngxQuery) {
            let query = this.ngxQuery.getQuery();
            if (query === undefined) {
                query = this.ngxQuery.queryTemplates[0].template;
            }
            result.query = query;

            if (query && query.rules && query.rules.length > 0) {

                for (const rule of query.rules) {
                    if (rule.op === 'bt' && rule.datas && rule.datas.length > 1) {
                        if (rule.datas[0] && rule.datas[0] !== null &&
                            rule.datas[0] !== '' && rule.datas[0] !== undefined) {
                            result.filters.push({
                                field: rule.field,
                                op: 'ge',
                                term: rule.datas[0]
                            });
                        }
                        if (rule.datas[1] && rule.datas[1] !== null &&
                            rule.datas[1] !== '' && rule.datas[1] !== undefined) {
                            result.filters.push({
                                field: rule.field,
                                op: 'le',
                                term: rule.datas[1]
                            });
                        }
                    } else {
                        if (rule.data && rule.data !== null && rule.data !== '' && rule.data !== undefined) {
                            result.filters.push({
                                field: rule.field,
                                op: rule.op,
                                term: rule.data
                            });
                        }
                    }
                }
            }
        }

        return result;
    }

    private loadCachePaging() {

        this._tempQueryTemplates = [{
            name: this.ngxQuery.queryTemplates[0].name,
            template: cloneQueryGroup(this.ngxQuery.queryTemplates[0].template)
        }];

        const paging = JSON.parse(sessionStorage.getItem(this.router.url + '|saveState|dt'));

        if (paging) {
            // page
            this._pageIndex = paging.pageIndex;
            this._pageSize = paging.pageSize;
            // query
            if (paging.filters && paging.filters.length > 0 && paging.rules) {
                this.ngxQuery.queryTemplates[0].template.rules = paging.rules;
            }
            // sort
            if (paging.sorts && paging.sorts.length > 0) {
                this._sorts = paging.sorts;
            }
        }
    }
}
