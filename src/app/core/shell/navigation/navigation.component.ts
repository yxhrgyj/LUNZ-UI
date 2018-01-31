import { Component, OnInit, AfterViewChecked, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap';

import { Logger } from '../../logger.service';
import { LoggerFactory } from '../../logger-factory.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { ProfileService, Profile } from '../../profile/profile.service';

declare const mLayout: any;
declare const jQuery: any;

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    providers: [AuthenticationService, ProfileService]
})
export class NavigationComponent implements OnInit, AfterViewChecked {

    log: Logger;
    isAuthenticated: boolean;
    menuItems: any;

    private _loaded = false;

    constructor(
        private authenticationService: AuthenticationService,
        private profileService: ProfileService,
        private loggerFactory: LoggerFactory,
        private router: Router,
        private modalService: BsModalService) {
        this.log = this.loggerFactory.getLogger('Navigation');
    }

    ngOnInit() {

        this.isAuthenticated = this.authenticationService.isAuthenticated();

        if (this.isAuthenticated) {
            this.getMenuItems();
        }
    }

    ngAfterViewChecked() {
        if (this._loaded === false) {
            mLayout.initAside();
            this._loaded = true;
            jQuery('#m_aside_left_minimize_toggle').click();
        }
    }

    isActive(url: string): boolean {
        if (url) {
            return this.router.isActive(url, true);
        }
    }

    private getMenuItems(): void {
        this.profileService.getMenuItems()
            .subscribe(menuItems => {
                this.menuItems = menuItems;
            }, error => {
                this.log.error(error);
            });
    }
}
