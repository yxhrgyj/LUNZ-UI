import { Component, OnInit } from '@angular/core';

import { LoggerFactory } from '../../../../logger-factory.service';
import { Logger } from '../../../../logger.service';
import { OperationService } from '../../quick-actions/operation-service/operation.service';

declare var $: any;

@Component({
    selector: 'app-top-menu-actions, [app-top-menu-actions]',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})

export class ActionsComponent implements OnInit {
    log: Logger;

    myOperationMyModelList: Array<any> = [];
    myOperationOpenHistoryList: Array<any> = [];
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
        this.myOperationMyModelList = this.operationService.getModeList(`myOperationMyModelList`) || [];
        this.myOperationOpenHistoryList = this.operationService.getModeList(`openHistoryList`) || [];

        $('.m-menu__submenu--left').on('click', '.lz-m-menu__link', function () {
            $(this).parents('.m-menu__item--rel').removeClass('m-menu__item--open-dropdown m-menu__item--hover');
        });
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
        const count = this.myOperationOpenHistoryList.length;

        this.myOperationOpenHistoryList.splice(0, count);

        localStorage.setItem(`openHistoryList`, JSON.stringify(this.myOperationOpenHistoryList));

        this.log.info(`移除成功！`);
    };

    gitAllModel() {
        const allModel = JSON.parse(localStorage.getItem(`menuListAll`));

        allModel.forEach((item: any) => {
            this.myOperationMyModelList.forEach((itemt: any) => {
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
        if (this.temporaryList.length > 5) {
            this.log.warn(`最多添加5个模块！`);
            return;
        }

        this.myOperationMyModelList = this.operationService.sortModelList(this.temporaryList);
        localStorage.setItem(`myOperationMyModelList`, JSON.stringify(this.myOperationMyModelList));

        this.temporaryList = [];
        this.addModel = false;

        this.log.info(`操作成功！`);
    };

    cancelCheckedModel(): void {
        this.temporaryList = [];
        this.addModel = false;
    };

};
