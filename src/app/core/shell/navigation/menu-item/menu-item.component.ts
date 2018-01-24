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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get hasChild(): boolean {
    return this.menuItem && this.menuItem.children && this.menuItem.children.length > 0;
  }

  get icon(): string {
    let icon: string = this.menuItem.icon;

    if (icon === undefined || icon === '') {
      icon = 'flaticon-app';
    }

    return 'm-menu__link-icon ' + icon;
  }

  isActive(url: string): boolean {
    if (url) {
      return this.router.isActive(url, true);
    }
  }
}
