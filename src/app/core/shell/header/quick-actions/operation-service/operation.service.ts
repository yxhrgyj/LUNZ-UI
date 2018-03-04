import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class OperationService {
    recordClickMenu: Array<any> = [];

    constructor(
        private router: Router
    ) { };

    sortModelList(modeList: any) {
        modeList.sort((x: any, y: any) => {
            return y.clickNum - x.clickNum;
        });
        return modeList;
    };

    getModeList(modelName: string) {
        const modeList = JSON.parse(localStorage.getItem(modelName));

        if (modeList !== null) {
            return this.sortModelList(modeList);
        }
    };

    fastEntryModule(row: any): void {
        const url = row.url;

        this.recordMenu(row);
        this.router.navigate([url]);
    };

    recordMenu(rew: any) {
        if (rew.url) {
            const openHistoryList = localStorage.getItem(`openHistoryList`);
            if (openHistoryList == null) {
                this.recordClickMenu.push({
                    clickNum: 1,
                    name: rew.name,
                    icon: rew.icon,
                    url: rew.url
                });

                localStorage.setItem(`openHistoryList`, JSON.stringify(this.recordClickMenu));
            } else {
                this.recordClickMenu = JSON.parse(openHistoryList);

                for (let i = 0; i < this.recordClickMenu.length; i++) {
                    if (this.recordClickMenu[i].name === rew.name) {
                        this.recordClickMenu[i].clickNum += 1;

                        localStorage.setItem(`openHistoryList`, JSON.stringify(this.recordClickMenu));
                        this.recordClickMenu = [];
                        return;
                    }
                }

                this.recordClickMenu.push({
                    clickNum: 1,
                    name: rew.name,
                    icon: rew.icon,
                    url: rew.url
                });

                localStorage.setItem(`openHistoryList`, JSON.stringify(this.recordClickMenu));
                this.recordClickMenu = [];
            }
        }
    };
};
