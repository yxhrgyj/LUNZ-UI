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

    ngOnInit() {
    };

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
            this.openModelList = JSON.parse(localStorage.getItem(`openModelList`));

            if (this.openModelList === null) {
                this.recordClickMenu.push({
                    clickNum: menu.sortOrder,
                    name: menu.name,
                    icon: menu.icon,
                    url: menu.ngUrl
                });

                localStorage.setItem(`openModelList`, JSON.stringify(this.recordClickMenu));

                this.recordClickMenu = [];
            } else {
                for (let i = 0; i < this.openModelList.length; i++) {
                    if (this.openModelList[i].name === menu.name) {
                        this.openModelList[i].clickNum += 1;
                        localStorage.setItem(`openModelList`, JSON.stringify(this.openModelList));
                        return;
                    }
                }

                this.openModelList.push({
                    clickNum: menu.sortOrder,
                    name: menu.name,
                    icon: menu.icon,
                    url: menu.ngUrl
                });

                localStorage.setItem(`openModelList`, JSON.stringify(this.openModelList));

            }
        }
    };
};
