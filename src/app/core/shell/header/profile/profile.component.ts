import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap';

import { Logger } from '../../../logger.service';
import { LoggerFactory } from '../../../logger-factory.service';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { ProfileService, Profile } from '../../../profile/profile.service';
import {
  ChangePasswordModalComponent
} from '../../../../change-password/change-password-modal/change-password-modal.component';

declare var $: any;

@Component({
  selector: 'app-profile, [app-profile]',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  log: Logger;
  processing = true;
  isAuthenticated: boolean;
  profile: Profile = {
    displayName: '',
    username: ''
  };

  constructor(private authenticationService: AuthenticationService,
    private profileService: ProfileService,
    private loggerFactory: LoggerFactory,
    private router: Router,
    private modalService: BsModalService) {
    this.log = this.loggerFactory.getLogger('Profile');
  }

  ngOnInit() {

    this.isAuthenticated = this.authenticationService.isAuthenticated();

    if (this.isAuthenticated) {
      this.getProfile();
    }

  }

  logout() {
    const menuOpen = $('.m-brand__toggler--active');

    sessionStorage.setItem('logout', 'logout');

    if (menuOpen.length > 0) {
      $('#m_aside_left_minimize_toggle').trigger('click');
    }

    this.authenticationService
      .logout()
      .subscribe(() => this.router.navigate(['/login']));
  }

  changePassword() {
    const modalRef = this.modalService.show(ChangePasswordModalComponent, { backdrop: 'static' });
  }

  viewMessages() {
    this.router.navigateByUrl('/messages/all');
  }

  private getProfile(): void {
    this.profileService.getProfile()
      .subscribe(profile => {
        this.profile = profile;
      }, error => {
        this.log.error(error);
      });
  }
}
