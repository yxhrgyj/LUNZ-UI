import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LoggerFactory } from '../../../../logger-factory.service';
import { Logger } from '../../../../logger.service';

@Component({
    selector: 'app-top-menu-actions, [app-top-menu-actions]',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
    log: Logger;
    myModelList: Array<any> = [];
    openModelList: Array<any> = [];
    editMyModel: Boolean = false;
    editModel: Boolean = false;

    constructor(
        private router: Router,
        private loggerFactory: LoggerFactory,
    ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit() {
        this.getModeList(`myModelList`, 1);
        this.getModeList(`openModelList`, -1);
    };

    sortModelList(modeList: any): void {
        modeList.sort((x: any, y: any) => {
            return y.clickNum - x.clickNum;
        });
    };

    getModeList(modelName: string, modeType: number): void {
        const modeList = JSON.parse(localStorage.getItem(`${modelName}`));
        console.log(modeList);
        if (modeList != null) {
            this.sortModelList(modeList);

            if (modeType === 1) {
                this.myModelList = modeList;
            } else {
                this.openModelList = modeList;
            }
        }
    };

    fastEntryModule(row: any): void {
        const url = row.url;

        this.router.navigate([url]);
    };

    moveModel(row: any, i: any, list: Array<any>, sortType: number, moveListName: string): void {
        if (sortType === 1) {
            list.forEach((item, index) => {
                if (i === index + 1) {
                    const preRowClickNum = item.clickNum;
                    row.clickNum = preRowClickNum + 1;
                }
            });
        } else if (sortType === -1) {
            list.forEach((item, index) => {
                if (i === index - 1) {
                    const preRowClickNum = item.clickNum;
                    row.clickNum = preRowClickNum - 1;
                }
            });
        }

        this.sortModelList(list);

        localStorage.setItem(`${moveListName}`, JSON.stringify(list));
    };

    deleteModel(row: any, list: Array<any>, i: number, deleteListName: string): void {
        list.splice(i, 1);

        localStorage.setItem(`${deleteListName}`, JSON.stringify(list));

        this.log.info(`${row.name} 移除成功！`);
    };

    deleteModelAll(): void {
        const count = this.openModelList.length;

        this.openModelList.splice(0, count);

        localStorage.setItem(`openModelList`, JSON.stringify(this.openModelList));

        this.log.info(`历史访问模块全部移除成功！`);
    };

};
