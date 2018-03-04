import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu-item, [app-menu-item]',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss']
})

export class MenuItemComponent implements OnInit {
    @Input('app-menu-item') menuItem: any;
    @Input() level: number;
    recordClickMenu: Array<any> = [];
    openModelList: Array<any> = [];

    constructor(private router: Router) { };

    ngOnInit() { };

    get hasChild(): boolean {
        return this.menuItem && this.menuItem.children && this.menuItem.children.length > 0;
    };

    get icon(): string {
        let icon: string = this.menuItem.icon;

        if (icon === undefined || icon === '') {
            icon = 'flaticon-app';
        }

        return 'm-menu__link-icon ' + icon;
    };

    isActive(url: string): boolean {
        if (url) {
            return this.router.isActive(url, true);
        }
    };

    recordMenu(menu: any) {
        if (menu.ngUrl) {
            const openHistoryList = JSON.parse(localStorage.getItem(`openHistoryList`));

            if (openHistoryList === null) {
                this.recordClickMenu.push({
                    clickNum: 1,
                    name: menu.name,
                    icon: menu.icon,
                    url: menu.ngUrl
                });

                localStorage.setItem(`openHistoryList`, JSON.stringify(this.recordClickMenu));
                this.recordClickMenu = [];
            } else {
                for (let i = 0; i < openHistoryList.length; i++) {
                    if (openHistoryList[i].name === menu.name) {
                        openHistoryList[i].clickNum += 1;

                        localStorage.setItem(`openHistoryList`, JSON.stringify(openHistoryList));
                        return;
                    }
                }

                openHistoryList.push({
                    clickNum: 1,
                    name: menu.name,
                    icon: menu.icon,
                    url: menu.ngUrl
                });
                localStorage.setItem(`openHistoryList`, JSON.stringify(openHistoryList));
            }
        }
    };
};
