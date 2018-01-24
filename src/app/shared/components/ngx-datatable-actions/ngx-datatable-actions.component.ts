import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';

import { DatatableComponent } from '@swimlane/ngx-datatable/release/components';
import { TableColumn } from '@swimlane/ngx-datatable/release/types';

@Component({
  selector: 'app-ngx-datatable-actions',
  templateUrl: './ngx-datatable-actions.component.html',
  styleUrls: ['./ngx-datatable-actions.component.scss']
})
export class NgxDatatableActionsComponent implements OnInit, AfterViewChecked {

  @Input()
  datatable: DatatableComponent;
  @Input()
  visibleColumns: string[] = [];
  @Input()
  cacheData = false;

  allColumns: TableColumn[] = [];

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.datatable && this.datatable['ngx-datatable-actions']) {
      this.allColumns = this.datatable['ngx-datatable-actions'];
    } else {
      for (const col of this.datatable.columns) {
        col['visible'] = true;
        col['fixed'] = false;
        this.allColumns.push(col);
      }
      if (this.cacheData === true) {
        this.loadCacheData();
      }
    }
  }

  ngAfterViewChecked() {
    if (this.datatable && this.datatable['ngx-datatable-actions']) {
      this.allColumns = this.datatable['ngx-datatable-actions'];
    }
  }

  toggleVisible(column: TableColumn): void {
    column['visible'] = !column['visible'];
    this.setTableColumn();
  }

  pinningVisible(column: TableColumn): void {
    column['fixed'] = !column['fixed'];
    this.allColumns[this.allColumns.indexOf(column)].frozenLeft = column['fixed'];
    this.setTableColumn();
  }

  private setTableColumn() {
    const columns = this.allColumns.filter(c => {
      return c['visible'];
    });
    this.datatable.columns = columns;
    this.datatable['ngx-datatable-actions'] = this.allColumns;
    if (this.cacheData === true) {
      this.cacheColumn();
    }
  }

  private loadCacheData() {
    let vcns: string[] = [];
    let fcns: string[] = [];
    const cache = sessionStorage.getItem(this.router.url + '|dt');
    if (cache != null) {
      const colns = JSON.parse(cache);
      vcns = colns[0].split(',');
      fcns = colns[1].split(',');
      this.allColumns.forEach(c => {
        if (vcns.length > 0 && c.name && vcns.indexOf(c.name) === -1) {
          c['visible'] = false;
        }
        if (fcns.length > 0 && fcns.indexOf(c.name) > -1) {
          c['fixed'] = true;
          c.frozenLeft = true;
        }
      });
    }
    this.setTableColumn();
  }

  private cacheColumn() {
    const vcol: string[] = [];
    const fcol: string[] = [];
    const columns = this.allColumns.filter(c => {
      return (c['visible'] || c['fixed']) && c.name;
    });
    columns.forEach(c => {
      if (c['visible']) {
        vcol.push(c.name);
      }
      if (c['fixed']) {
        fcol.push(c.name);
      }
    });
    if (vcol || fcol) {
      const value = JSON.stringify([vcol.join(','), fcol.join(',')]);
      sessionStorage.setItem(this.router.url + '|dt', value);
    } else {
      sessionStorage.removeItem(this.router.url + '|dt');
    }

  }
}
