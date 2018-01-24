import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class SsoServiceService {

  constructor() { }

  get canLogin(): boolean {
    const singleLogin = sessionStorage.getItem('SingleWebSiteLogin');
    if (singleLogin && singleLogin !== undefined && singleLogin !== '') {
      return true;
    } else {
      return false;
    }
  }

  get ssoCheckUrl(): string {
    return environment.userCenter.authUri + 'Auth/Check?returnUrl=' + encodeURI(window.location.href);
  }
}
