import { Component, OnInit } from '@angular/core';

import { LoggerFactory } from '../../../logger-factory.service';
import { Logger } from '../../../logger.service';

@Component({
    selector: 'app-quick-actions, [app-quick-actions]',
    templateUrl: './quick-actions.component.html',
    styleUrls: ['./quick-actions.component.scss']
})
export class QuickActionsComponent implements OnInit {
    log: Logger;

    myModelList: Array<any> = [];
    openModelList: Array<any> = [];
    allModelList: Array<any> = [];
    temporaryList: Array<any> = [];
    modelOption: Boolean = true;

    constructor(
        private loggerFactory: LoggerFactory,
    ) {
        this.log = this.loggerFactory.getLogger();
    }

    ngOnInit() {
        this.getModeList(`myModelList`, 1);
        this.getModeList(`openModelList`, -1);
    }

    getModeList(modelName: string, modeType: number): void {
        const modeList = JSON.parse(localStorage.getItem(`${modelName}`));

        if (modeList !== null) {
            if (modeType === 1) {
                this.myModelList = modeList;
            } else {
                this.openModelList = modeList;
            }
        }
    };

    gitAllModel(event: any) {
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
        this.myModelList = this.temporaryList;
        localStorage.setItem(`myModelList`, JSON.stringify(this.myModelList));

        this.temporaryList = [];
        this.modelOption = true;

        this.log.info(`操作成功！`);
    };


    cancelAddModel(): void {
        this.temporaryList = [];
        this.modelOption = true;
    }

}
