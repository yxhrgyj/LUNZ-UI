import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LoggerFactory } from '../../../../logger-factory.service';
import { Logger } from '../../../../logger.service';
import { OperationService } from '../operation-service/operation.service';

@Component({
    selector: 'app-my-module',
    templateUrl: './my-module.component.html',
    styleUrls: ['./my-module.component.scss']
})

export class MyModuleComponent implements OnInit {

    @Input() modelName: string;
    @Input() addIcon: Boolean;
    @Input() moveIcon: Boolean;
    @Input() removeAllIcon: Boolean;
    @Input() modelListName: string;
    @Input() removeListName: string;
    @Input() openHistoryListName: string;
    @Input() modelList: Array<any>;

    @Output() addModelEv = new EventEmitter<boolean>();

    log: Logger;
    editModel: Boolean = true;
    storageDragDom: any;
    recordClickMenu: Array<any> = [];

    constructor(
        private loggerFactory: LoggerFactory,
        private operationService: OperationService,
    ) {
        this.log = this.loggerFactory.getLogger();
    }

    ngOnInit() { }

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

        this.operationService.sortModelList(this.modelList);
        localStorage.setItem(`${this.modelListName}`, JSON.stringify(this.modelList));
    };

    removeModel(row: any, i: number, removeListName: any) {
        this.modelList.splice(i, 1);

        localStorage.setItem(`${removeListName}`, JSON.stringify(this.modelList));

        this.log.info(`${row.name} 移除成功！`);
    };

    removeAllModel(): void {
        this.modelList.length = 0;
        localStorage.setItem(`openHistoryList`, JSON.stringify(this.modelList));

        this.log.info(`移除成功！`);
    };

    addModel(agreed: boolean): void {
        this.addModelEv.emit(agreed);
    };

};
