import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LoggerFactory } from '../../../../logger-factory.service';
import { Logger } from '../../../../logger.service';

@Component({
    selector: 'app-my-module',
    templateUrl: './my-module.component.html',
    styleUrls: ['./my-module.component.scss']
})
export class MyModuleComponent implements OnInit {
    log: Logger;
    editModel: Boolean = true;
    storageDragDom: any;
    recordClickMenu: Array<any>;

    private _modelList: Array<any> = [];

    @Input() modelName: string;
    @Input() addIcon: Boolean;
    @Input() moveIcon: Boolean;
    @Input() removeAllIcon: Boolean;
    @Input() modelListName: string;
    @Input()
    set modelList(modelList: Array<any>) {
        if (modelList) {
            this.sortModelList(modelList);
            this._modelList = modelList;
        }
    }

    get modelList(): Array<any> {
        return this._modelList;
    }

    @Output() addModelEv = new EventEmitter<boolean>();

    constructor(
        private router: Router,
        private loggerFactory: LoggerFactory,
    ) {
        this.log = this.loggerFactory.getLogger();
    }

    ngOnInit() {

    }

    fastEntryModule(row: any): void {
        const url = row.url;

        this.recordMenu(row);
        this.router.navigate([url]);
    };

    sortModelList(modeList: any): void {
        modeList.sort((x: any, y: any) => {
            return y.clickNum - x.clickNum;
        });
    };

    moveModel(row: any, i: any, sortType: number): void {
        if (sortType === 1) {
            this.modelList.forEach((item, index) => {
                if (i === index + 1) {
                    const preRowClickNum = item.clickNum;
                    const rowRowClickNum = row.clickNum;
                    row.clickNum = preRowClickNum;
                    item.clickNum = rowRowClickNum;
                }
            });
        } else if (sortType === -1) {
            this.modelList.forEach((item, index) => {
                if (i === index - 1) {
                    const nextRowClickNum = item.clickNum;
                    const rowRowClickNum = row.clickNum;
                    row.clickNum = nextRowClickNum;
                    item.clickNum = rowRowClickNum;
                }
            });
        }

        this.sortModelList(this.modelList);
        localStorage.setItem(`${this.modelListName}`, JSON.stringify(this.modelList));
    };

    removeModel(row: any, i: number, modelListName: any) {
        this.modelList.splice(i, 1);

        localStorage.setItem(`${modelListName}`, JSON.stringify(this.modelList));

        this.log.info(`${row.name} 移除成功！`);
    };

    removeAllModel(): void {
        this.modelList.length = 0;
        localStorage.setItem(`${this.modelListName}`, JSON.stringify(this.modelList));

        this.log.info(`移除成功！`);
    };

    recordMenu(rew: any) {
        if (rew.url) {
            const openModelList = localStorage.getItem(`openModelList`);
            if (openModelList == null) {
                this.recordClickMenu.push({
                    clickNum: rew.clickNum,
                    name: rew.name,
                    icon: rew.icon,
                    url: rew.url
                });

                localStorage.setItem(`openModelList`, JSON.stringify(this.recordClickMenu));
            } else {
                this.recordClickMenu = JSON.parse(openModelList);

                for (let i = 0; i < this.recordClickMenu.length; i++) {
                    if (this.recordClickMenu[i].name === rew.name) {
                        this.recordClickMenu[i].clickNum += 1;

                        localStorage.setItem(`openModelList`, JSON.stringify(this.recordClickMenu));
                        this.recordClickMenu = [];
                        return;
                    }
                }

                this.recordClickMenu.push({
                    clickNum: rew.clickNum,
                    name: rew.name,
                    icon: rew.icon,
                    url: rew.url
                });

                localStorage.setItem(`openModelList`, JSON.stringify(this.recordClickMenu));
            }
        }
    };

    addModel(agreed: boolean): void {
        this.addModelEv.emit(agreed);
    };
    
}
