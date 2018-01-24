import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoggerFactory } from '../../../../core/logger-factory.service';
import { Logger } from '../../../../core/logger.service';
import { MessageService } from '../../../../messages/shared/message.service';

@Component({
  selector: 'app-notifications, [app-notifications]',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, AfterViewInit {

  log: Logger;
  unreadMessageCount = 0;
  unreadMessages: any[] = [];
  get iconClass(): string {
    const val = 'm-nav__link-icon';
    return this.unreadMessageCount === 0 ? val : val + ' m-animate-shake';
  }
  get badgeClass(): string {
    const val = 'm-nav__link-badge m-badge m-badge--dot m-badge--dot-small m-badge--danger';
    return this.unreadMessageCount === 0 ? val : val + ' m-animate-blink';
  }

  constructor(private router: Router,
    private messageService: MessageService,
    private loggerFactory: LoggerFactory) {

    this.log = this.loggerFactory.getLogger();

  }

  ngOnInit() {
    this.messageService.initSignalR();

    this.messageService.receivedMessage.subscribe((msg: any) => {
      const len = this.unreadMessages.unshift(msg);
      this.unreadMessageCount = len;
    });

    this.messageService.readMessage.subscribe((msg: any) => {
      this.getUnReadMessage();
    });

    this.getUnReadMessage();
  }

  ngAfterViewInit() { }

  viewMessages(unReadMsgId: string) {
    const url = '/messages/' + unReadMsgId;
    this.router.navigateByUrl(url);
  }

  private getUnReadMessage() {
    this.messageService.getUnreadMessages().subscribe(response => {
      if (response && response.length > 0) {
        this.unreadMessages = response;
        this.unreadMessageCount = response.length;
      } else {
        this.unreadMessages = [];
        this.unreadMessageCount = 0;
      }
    }, error => {
      this.log.error('获取未读消息失败！', error);
    });
  }
}
