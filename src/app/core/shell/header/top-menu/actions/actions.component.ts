import { Component, OnInit } from '@angular/core';

import { LoggerFactory } from '../../../../logger-factory.service';
import { Logger } from '../../../../logger.service';
import { OperationService } from '../../quick-actions/operation-service/operation.service';

@Component({
    selector: 'app-top-menu-actions, [app-top-menu-actions]',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})

export class ActionsComponent implements OnInit {
    log: Logger;

    myModelList: Array<any> = [];
    openModelList: Array<any> = [];
    allModelList: Array<any> = [];
    temporaryList: Array<any> = [];
    recordClickMenu: Array<any> = [];

    editMyModel: Boolean = false;
    editModel: Boolean = false;
    addModel: Boolean = false;

    constructor(
        private loggerFactory: LoggerFactory,
        private operationService: OperationService,
    ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit() {
        this.myModelList = this.operationService.getModeList(`myModelList`) || [];
        this.openModelList = this.operationService.getModeList(`openModelList`) || [];
    };

    moveModel(row: any, i: any, list: Array<any>, sortType: number, moveListName: string): void {
        if (sortType === 1) {
            list.forEach((item, index) => {
                if (i === index + 1) {
                    const preRowClickNum = item.clickNum;
                    const rowRowClickNum = row.clickNum;
                    row.clickNum = preRowClickNum;
                    item.clickNum = rowRowClickNum;
                }
            });
        } else if (sortType === -1) {
            list.forEach((item, index) => {
                if (i === index - 1) {
                    const nextRowClickNum = item.clickNum;
                    const rowRowClickNum = row.clickNum;
                    row.clickNum = nextRowClickNum;
                    item.clickNum = rowRowClickNum;
                }
            });
        }

        this.operationService.sortModelList(list);

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

    gitAllModel() {
        const allModel = JSON.parse(localStorage.getItem(`menuListAll`));

        allModel.forEach((item: any) => {
            this.myModelList.forEach((itemt: any) => {
                if (item.name === itemt.name) {
                    item.checked = true;

                    this.temporaryList.push(item);
                };
            });
        });

        this.allModelList = allModel;
        this.addModel = true;
    };

    handle(event: any, modelList: any) {
        if (event.target.checked === true) {
            this.temporaryList.push({
                name: modelList.name,
                icon: modelList.icon,
                url: modelList.url,
                clickNum: modelList.clickNum,
                checked: true
            });
        } else {
            this.temporaryList.forEach((item: any, index: any) => {
                if (modelList.name === item.name) {
                    this.temporaryList.splice(index, 1);

                    return;
                }
            });
        }
    };

    submitCheckedModel(): void {
        this.myModelList = this.temporaryList;
        localStorage.setItem(`myModelList`, JSON.stringify(this.myModelList));

        this.temporaryList = [];
        this.addModel = false;

        this.log.info(`操作成功！`);
    };

    cancelCheckedModel(): void {
        this.temporaryList = [];
        this.addModel = false;
    };

};
