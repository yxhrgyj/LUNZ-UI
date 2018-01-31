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
                id: 1,
                name: `订单管理`,
                icon: `flaticon-time-1`,
                url: `/orders`
            },
            {
                id: 2,
                name: `用户管理`,
                icon: `flaticon-list-1`,
                url: `/orders`
            },
            {
                id: 3,
                name: `角色管理`,
                icon: `flaticon-lifebuoy`,
                url: `/orders`
            }
        ];
        localStorage.setItem(`openModelList`, JSON.stringify(list));
    }

    ngOnInit() {
        this.getOpenModeList();
    }
    getOpenModeList(): void {
        const modeList = JSON.parse(localStorage.getItem(`openModelList`));
        if (modeList !== null) {
            this.openModelList = modeList;
        };
    };
    jumpMode(row: any) {
        const url = row.url;
        this.router.navigate([url]);
    };
    deleteModel(i: number) {
        this.openModelList.splice(i, 1);
    };

};
