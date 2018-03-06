import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { SignalR, SignalRConnection, BroadcastEventListener } from 'ng2-signalr';

import { Subscription } from 'rxjs/Subscription';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { WebApiResultResponse, PagingResponse } from '../../core/http/web-api-result-response';
import { LoggerFactory } from '../../core/logger-factory.service';
import { Logger } from '../../core/logger.service';

import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/authentication/authentication.service';

import { WebMessage } from './web-message';

@Injectable()
export class MessageService extends WebApiResultResponse {

    receivedMessage: EventEmitter<any> = new EventEmitter<any>();
    readMessage: EventEmitter<any> = new EventEmitter<any>();
    log: Logger;

    private _connection: SignalRConnection;
    private _subscription: Subscription;

    constructor(private http: Http,
        private _signalR: SignalR,
        private router: Router,
        private authenticationService: AuthenticationService,
        private loggerFactory: LoggerFactory) {
        super();
        this._connection = this._signalR.createConnection();
        this.log = this.loggerFactory.getLogger();
    }

    getUnreadMessages(): Observable<any> {

        const url = environment.msgCenter.serverUrl + 'Message/GetUnReadWebMsg';

        return this.http.get(url, {
            headers: new Headers({
                'AppKey': environment.msgCenter.appKey,
                'X-XSS-Protection': '1',
                'X-Content-Type-Options': 'nosniff'
            }),
            params: {
                'username': this.authenticationService.credentials.username
            }
        }).map(response => {
            const result = super.handleSuccess(response);
            return result;
        }).catch(super.handleError);
    }

    getMessages(paging: any): Observable<PagingResponse> {

        const url = environment.msgCenter.serverUrl + 'Message/GetWebMsg';

        return this.http.get(url, {
            headers: new Headers({
                'AppKey': environment.msgCenter.appKey,
                'X-XSS-Protection': '1',
                'X-Content-Type-Options': 'nosniff'
            }),
            params: {
                'paging': paging,
                'username': this.authenticationService.credentials.username
            }
        }).map(super.handleSuccess)
            .catch(super.handleError);
    }

    setReadMessage(msgId: any): Observable<any> {
        const url = environment.msgCenter.serverUrl + 'Message/SetRead';

        return this.http.get(url, {
            headers: new Headers({
                'AppKey': environment.msgCenter.appKey,
                'X-XSS-Protection': '1',
                'X-Content-Type-Options': 'nosniff'
            }),
            params: {
                'msgId': msgId
            }
        }).map(response => {
            const result = super.handleSuccess(response);
            this.readMessage.emit(result);
            return result;
        }).catch(super.handleError);

    }

    initSignalR() {
        const username = this.authenticationService.credentials.username;
        if (this.hasValue(username)) {
            this._connection.start().then((c) => {
                this._connection.invoke('JoinConversation', {
                    FromUsername: username,
                    FromDisplayName: username
                }).catch((err: any) => this.log.error('Failed to invoke \'joinConversation\'.Error:' + err));
            }).catch((err: any) => this.log.error('Failed SignalR startes.Error:' + err));
        }

        const onMessageSent$ = new BroadcastEventListener<WebMessage>('OnMessageSent');
        // register the listener
        this._connection.listen(onMessageSent$);
        // subscribe to event
        this._subscription = onMessageSent$.subscribe((parms: WebMessage) => {
            const msg = {
                UnreadMessageId: parms.UnreadMessageId,
                Message: parms.Message,
                SentAt: parms.SentAt,
                Read: false,
                DisplayName: username,
                Username: username,
                SendToId: (new Date()).valueOf()
            };
            this.log.info('您有一条新消息!' + msg.Message);
            this.receivedMessage.emit(msg);
        });
    }

    hasValue(str: string): boolean {
        return str && str !== null && str !== '' && str !== undefined;
    }
}
