import 'rxjs/add/observable/throw';

import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {
    Http, ConnectionBackend, RequestOptions, Headers,
    Request, Response, RequestOptionsArgs, RequestMethod, ResponseOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { extend } from 'lodash';

import { environment } from '../../../environments/environment';
import { Logger } from '../logger.service';
import { LoggerFactory } from '../logger-factory.service';
import { HttpCacheService } from './http-cache.service';
import { HttpCachePolicy } from './request-options-args';

import { AuthenticationService, Credentials } from '../authentication/authentication.service';

import { toURLSearchParams } from './http-helper';

declare var URI: any;

/**
 * Provides a base framework for http service extension.
 * The default extension adds support for API prefixing, request caching and default error handler.
 */
@Injectable()
export class HttpService extends Http {

    log: Logger;

    constructor(backend: ConnectionBackend,
        private defaultOptions: RequestOptions,
        private httpCacheService: HttpCacheService,
        private router: Router,
        private loggerFactory: LoggerFactory,
        private injector: Injector) {
        // Customize default options here if needed
        super(backend, defaultOptions);

        this.log = this.loggerFactory.getLogger(environment.production ? undefined : 'HttpService');
    }

    /**
     * Performs any type of http request.
     * You can customize this method with your own extended behavior.
     */
    request(request: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        options = options || {};
        let url: string;

        const authenticationService: AuthenticationService = this.injector.get(AuthenticationService);
        const credentials: Credentials = authenticationService.isAuthenticated() ? authenticationService.credentials : null;
        const token: string = credentials == null ? null : credentials.token;

        if (options && options != null && options.params && options.params != null) {
            if (options.params['paramsMap'] === undefined) {
                options.params = toURLSearchParams(options.params);
            }
        }

        // DON'T add 'environment.serverUrl' if 'request.url' starts with 'http://', 'https://' or '//'.
        const regex = new RegExp('^(http://|https://|//)');
        if (typeof request === 'string') {
            url = request;
            if (!regex.test(url)) {
                request = environment.serverUrl + url;
            }
        } else {
            url = request.url;
            if (!regex.test(url)) {
                request.url = environment.serverUrl + url;
            }
        }

        // Add custom params
        request = this.addCustomParams(request, options, token);

        if (!options.cache) {
            // Do not use cache
            return this.httpRequest(request, options);
        } else {
            return new Observable((subscriber: Subscriber<Response>) => {
                // Get Cache Params
                const cacheParams = {};
                if (options.headers) {
                    cacheParams['headers'] = options.headers.toJSON();
                }
                const cachedData = options.cache === HttpCachePolicy.Update
                    ? null : this.httpCacheService.getCacheData(url, cacheParams);
                if (cachedData !== null) {
                    // Create new response to avoid side-effects
                    subscriber.next(new Response(cachedData));
                    subscriber.complete();
                } else {
                    this.httpRequest(request, options).subscribe(
                        (response: Response) => {
                            // Store the serializable version of the response
                            this.httpCacheService.setCacheData(url, cacheParams, new ResponseOptions({
                                body: response.text(),
                                status: response.status,
                                headers: response.headers,
                                statusText: response.statusText,
                                type: response.type,
                                url: response.url
                            }));
                            subscriber.next(response);
                        },
                        (error) => subscriber.error(error),
                        () => subscriber.complete()
                    );
                }
            });
        }
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(url, extend({}, options, { method: RequestMethod.Get }));
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(url, extend({}, options, {
            body: body,
            method: RequestMethod.Post
        }));
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(url, extend({}, options, {
            body: body,
            method: RequestMethod.Put
        }));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(url, extend({}, options, { method: RequestMethod.Delete }));
    }

    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(url, extend({}, options, {
            body: body,
            method: RequestMethod.Patch
        }));
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(url, extend({}, options, { method: RequestMethod.Head }));
    }

    options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(url, extend({}, options, { method: RequestMethod.Options }));
    }

    // Customize the default behavior for all http requests here if needed
    private httpRequest(request: string | Request, options: RequestOptionsArgs): Observable<Response> {
        let req = super.request(request, options);
        if (!options.skipErrorHandler) {
            req = req.catch(this.errorHandler.bind(this));
        }
        return req;
    }

    // Customize the default error handler here if needed
    private errorHandler(response: Response): Observable<Response> {

        if (response && response.status && response.status === 401) {
            this.log.debug('未认证，跳转登录页...');
            this.router.navigate(['/login']);
        }

        let message = '服务器错误，请联系系统管理员。';
        if (response && response.status) {
            if (response.status === 400) {
                return Observable.throw(response);
            } else if (response.status === 401) {
                // Handle the 404 error on the top.
                message = '未认证，需要用户登录。';
            } else if (response.status === 403) {
                message = '当前用户未被授权。';
            } else if (response.status === 404) {
                message = '访问的数据（页面）不存在。';
            } else if (response.status === 503) {
                message = '服务器服务无效，请联系系统管理员。';
            } else if (response.status >= 500) {
                message = '服务器错误，请联系系统管理员。';
            }
        }
        this.log.error(message, response);
        return Observable.throw(response);
    }

    private addCustomParams(request: string | Request, options: RequestOptionsArgs, token: string): string | Request {
        if (environment.withHeaders) {
            // Add custom params to 'headers'
            if (options.headers === undefined) {
                options.headers = new Headers({
                    'AppKey': environment.appKey,
                    'AuthToken': token,
                    'X-XSS-Protection': '1',
                    'X-Content-Type-Options': 'nosniff'
                });
            } else {
                if (!options.headers.has('AppKey')) {
                    options.headers.append('AppKey', environment.appKey);
                }
                if (!options.headers.has('AuthToken')) {
                    options.headers.append('AuthToken', token);
                }
            }
        } else {
            // Add custom params to 'query string'
            let url: string;
            if (typeof request === 'string') {
                url = request;
            } else {
                url = request.url;
            }

            const urlParser: any = URI(url);
            if (!urlParser.hasQuery('AppKey')) {
                urlParser.addSearch('AppKey', environment.appKey);
            }
            if (!urlParser.hasQuery('AuthToken')) {
                urlParser.addSearch('AuthToken', token);
            }

            url = urlParser.toString();
            if (typeof request === 'string') {
                request = url;
            } else {
                request.url = url;
            }
        }

        return request;
    }
}
