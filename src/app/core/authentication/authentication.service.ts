import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { SharedSessionStorageService } from '../../shared/services/shared-session-storage.service';
import { WebApiResultResponse } from '../http/web-api-result-response';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export interface WebApiResult {
  success: boolean;
  data?: any;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService extends WebApiResultResponse {

  private _credentials: Credentials;

  constructor(private http: Http, private sharedSessionStorage: SharedSessionStorageService) {
    super();
    this._credentials = JSON.parse(
        this.sharedSessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey));
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {

    const url = 'membership/login';
    const params = {
      'username': context.username,
      'password': context.password,
      'remember': context.remember
    };

    return this.http.post(url, params)
      .map(response => {

        const result = super.handleSuccess(response);

        const data = {
          username: context.username,
          token: result
        };
        this.setCredentials(data, context.remember);

        return data;
      }).catch(super.handleError);
  }

  /**
   * Authenticates the user.
   * @param {AuthToken} authToken The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  loginByAuthToken(authToken: string): Observable<Credentials> {

    const url = `membership/loginByAuthToken/${authToken}`;

    return this.http.get(url)
      .map(response => {
        const result = super.handleSuccess(response);
        const data = {
          username: result.userName,
          token: result.authToken
        };
        this.setCredentials(data);
        return data;
      }).catch(super.handleError);
  }

  /**F
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {

    const url = 'membership/logout';

    return this.http.get(url)
      .map(response => {
        const result = super.handleSuccess(response);
        if (result) {
          this.setCredentials();
          return true;
        }
      }).catch(super.handleError);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage: any = remember ? localStorage : this.sharedSessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      this.sharedSessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
