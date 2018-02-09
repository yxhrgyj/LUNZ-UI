import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-quick-actions, [app-quick-actions]',
    templateUrl: './quick-actions.component.html',
    styleUrls: ['./quick-actions.component.scss']
})
export class QuickActionsComponent implements OnInit {
    myModelList: Array<any>;
    openModelList: Array<any>;

    constructor() { }

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

}
