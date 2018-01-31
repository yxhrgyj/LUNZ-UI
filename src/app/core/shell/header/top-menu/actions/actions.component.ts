import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-top-menu-actions, [app-top-menu-actions]',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
    openModelList: Array<any> = [];
    editModel: Boolean = false;

    constructor(
        private router: Router
    ) {
        const list: any = [
            {
                clickNum: 5,
                name: `订单管理`,
                icon: `flaticon-time-1`,
                url: `/orders`
            },
            {
                clickNum: 10,
                name: `用户管理`,
                icon: `flaticon-list-1`,
                url: `/orders`
            },
            {
                clickNum: 11,
                name: `用4524户管理`,
                icon: `flaticon-list-1`,
                url: `/orders`
            },
            {
                clickNum: 12,
                name: `用户12管理`,
                icon: `flaticon-list-1`,
                url: `/orders`
            },
            {
                clickNum: 17,
                name: `用户12管理`,
                icon: `flaticon-list-1`,
                url: `/orders`
            },
            {
                clickNum: 18,
                name: `用户1286管理`,
                icon: `flaticon-list-1`,
                url: `/orders`
            },
            {
                clickNum: 3,
                name: `角色管理`,
                icon: `flaticon-lifebuoy`,
                url: `/orders`
            }
        ];
        localStorage.setItem(`openModelList`, JSON.stringify(list));
    };

    ngOnInit() {
        this.getOpenModeList();
    };

    sortModelList(modeList: any): void {
        modeList.sort((x: any, y: any) => {
            return y.clickNum - x.clickNum;
        });
    };

    getOpenModeList(): void {
        const modeList = JSON.parse(localStorage.getItem(`openModelList`));

        if (modeList !== null) {
            this.sortModelList(modeList);
            this.openModelList = modeList;
        }
    };

    fastEntryModule(row: any): void {
        const url = row.url;
        this.router.navigate([url]);
    };

    moveModel(row: any, i: any, sortType: number): void {
        if (sortType === 1) {
            const rowClickNum = row.clickNum;
            const rowIndex = i;

            this.openModelList.forEach((item, index) => {
                if (i === index + 1) {
                    const preRowClickNum = item.clickNum;
                    row.clickNum = preRowClickNum + 1;
                }
            });

        } else if (sortType === -1) {
            const rowClickNum = row.clickNum;
            const rowIndex = i;

            this.openModelList.forEach((item, index) => {
                if (i === index - 1) {
                    const preRowClickNum = item.clickNum;
                    row.clickNum = preRowClickNum - 1;
                }
            });
        }

        this.sortModelList(this.openModelList);
        localStorage.setItem(`openModelList`, JSON.stringify(this.openModelList));
    };

    deleteModel(i: number): void {
        this.openModelList.splice(i, 1);
        localStorage.setItem(`openModelList`, JSON.stringify(this.openModelList));
    };

    deleteModelAll(): void {
        const count = this.openModelList.length;
        this.openModelList.splice(0, count);
        localStorage.setItem(`openModelList`, JSON.stringify(this.openModelList));
    };

};
