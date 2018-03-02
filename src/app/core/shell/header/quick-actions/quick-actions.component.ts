import { Component, OnInit } from '@angular/core';

import { LoggerFactory } from '../../../logger-factory.service';
import { Logger } from '../../../logger.service';
import { OperationService } from './operation-service/operation.service';

@Component({
    selector: 'app-quick-actions, [app-quick-actions]',
    templateUrl: './quick-actions.component.html',
    styleUrls: ['./quick-actions.component.scss']
})
export class QuickActionsComponent implements OnInit {
    log: Logger;

    quickOperationMyModelList: Array<any> = [];
    quickOperationOpenHistoryList: Array<any> = [];
    allModelList: Array<any> = [];
    temporaryList: Array<any> = [];
    modelOption: Boolean = true;

    constructor(
        private loggerFactory: LoggerFactory,
        private operationService: OperationService
    ) {
        this.log = this.loggerFactory.getLogger();
    }

    ngOnInit() {
        this.quickOperationMyModelList = this.operationService.getModeList(`quickOperationMyModelList`) || [];
        this.quickOperationOpenHistoryList = this.operationService.getModeList(`quickOperationOpenHistoryList`) || [];
    }

    gitAllModel(event: any) {
        const allModel = JSON.parse(localStorage.getItem(`menuListAll`));

        allModel.forEach((item: any) => {
            this.quickOperationMyModelList.forEach((itemt: any) => {
                if (item.name === itemt.name) {
                    item.checked = true;

                    this.temporaryList.push(item);
                };
            });
        });

        this.allModelList = allModel;
        this.modelOption = event;
    };

    handle(event: any, row: any) {
        if (event.target.checked === true) {
            this.temporaryList.push({
                name: row.name,
                icon: row.icon,
                url: row.url,
                clickNum: row.clickNum,
                checked: true
            });
        } else {
            this.temporaryList.forEach((item: any, index: any) => {
                if (row.name === item.name) {
                    this.temporaryList.splice(index, 1);

                    return;
                }
            });
        }
    };

    submitCheckedModel(): void {
        if (this.temporaryList.length > 6) {
            this.log.warn(`最多添加6个模块！`);
            return;
        }

        this.quickOperationMyModelList = this.operationService.sortModelList(this.temporaryList);
        localStorage.setItem(`quickOperationMyModelList`, JSON.stringify(this.quickOperationMyModelList));

        this.temporaryList = [];
        this.modelOption = true;

        this.log.info(`操作成功！`);
    };


    cancelAddModel(): void {
        this.temporaryList = [];
        this.modelOption = true;
    }

}
