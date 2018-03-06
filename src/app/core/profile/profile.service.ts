import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

import { WebApiResultResponse } from '../http/web-api-result-response';
import { AuthenticationService } from '../authentication/authentication.service';

export interface Profile {
  displayName: string;
  username: string;
}

@Injectable()
export class ProfileService extends WebApiResultResponse {

  private _profile: Profile;

  constructor(
    private authenticationService: AuthenticationService,
    private http: Http) {
    super();
  }

  /**
   * Get the curent user's profile.
   * @return {Observable<Profile>} The curent user's profile details.
   */
  getProfile(): Observable<Profile> {

    if (this._profile && this._profile != null) {
      return Observable.of(this._profile);
    }

    const url = 'membership/getUserInfo';

    return this.http.get(url)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  /**
   * Get the current user's menu items.
   * @return {Observable<any>} The current user's menu items.
   */
  getMenuItems(): Observable<any> {

    const url = environment.userCenter.serverUrl + 'membership/getCurrentUserMenuItems';

    return this.http.get(url, {
      cache: true,
      headers: new Headers({
        'appKey': environment.userCenter.appKey,
        'authToken': this.authenticationService.credentials.token,
        'X-XSS-Protection': '1',
        'X-Content-Type-Options': 'nosniff'
      })
    }).map(response => {
      const menuItems = super.handleSuccess(response);
      if (menuItems) {
        this.setMenuItems(menuItems);
        return menuItems;
      }
    }).catch(super.handleError);
  }

  getApps(): Observable<any> {
    const url = environment.userCenter.serverUrl + 'membership/getUserApps';

    const username = this.authenticationService.credentials.username;

    return this.http.get(url, {
      headers: new Headers({
        'AppKey': environment.userCenter.appKey,
        'X-XSS-Protection': '1',
        'X-Content-Type-Options': 'nosniff'
      }),
      params: {
        'username': username
      }
    }).map(super.handleSuccess)
      .catch(super.handleError);
  }

  /**
   * Change the current user's password.
   * @return {Observable<boolean>} True if the user's password was changed successfully.
   */
  changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Observable<boolean> {
    const url = 'membership/ChangePassword';
    const params = {
      'oldPassword': oldPassword,
      'newPassword': newPassword
    };
    return this.http.post(url, params)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  private setProfile(data: any): Profile {
    this._profile = {
      displayName: data.DisplayName,
      username: data.Username
    };
    return this._profile;
  }

  private setMenuItems(menuItems: any) {
    for (let i = menuItems.length - 1; i >= 0; i--) {
      const menuItem = menuItems[i];
      if (!menuItem.visible) {
        menuItems.splice(i, 1);
      }

      this.setMenuItems(menuItem.children);
    }
  }
}
