import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Logger } from '../logger.service';
import { LoggerFactory } from '../logger-factory.service';
import { AuthenticationService } from './authentication.service';
import { SsoServiceService } from '../../sso/shared/sso-service.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  log: Logger;

  constructor(private router: Router,
    private loggerFactory: LoggerFactory,
    private authenticationService: AuthenticationService,
    private ssoServiceService: SsoServiceService) {
    this.log = this.loggerFactory.getLogger('AuthenticationGuard');
  }

  canActivate(): boolean {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    }
    if (this.ssoServiceService.canLogin) {
      this.log.debug('Not authenticated, redirecting...');

      const returnUrl: string = window.location.pathname;
      let url = '/login';
      if (returnUrl && returnUrl !== '/' && returnUrl !== '/dashboard') {
        url += '?ReturnUrl=' + encodeURI(returnUrl);
      }
      this.router.navigateByUrl(url);

      return false;
    } else {
      window.location.href = this.ssoServiceService.ssoCheckUrl;
      return false;
    }
  }

}
