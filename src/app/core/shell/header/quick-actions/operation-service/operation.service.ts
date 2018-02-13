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
                this.recordClickMenu = [];
            }
        }
    };
};
