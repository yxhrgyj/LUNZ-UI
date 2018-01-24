import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoggerFactory } from '../../core/logger-factory.service';
import { Logger } from '../../core/logger.service';

import { MessageService } from '../shared/message.service';

declare var URI: any;

@Component({
  selector: 'app-web-message',
  templateUrl: './web-message.component.html',
  styleUrls: ['./web-message.component.scss']
})

export class WebMessageComponent implements OnInit {

  currentMsgId: string;
  webmessages: any[] = [];
  isShowDivMore = true;

  private log: Logger;
  private pageIndex = 0;
  private pageSize = 10;

  constructor(private messageService: MessageService,
    private route: ActivatedRoute,
    private loggerFactory: LoggerFactory) {
    this.log = this.loggerFactory.getLogger();
  }

  ngOnInit() {

    this.load();
    this.getMoreMessages();
    this.messageService.receivedMessage.subscribe((msg: any) => {
      this.webmessages.unshift(msg);
    });
  }

  setMessageRead(msg: any) {
    this.messageService.setReadMessage(msg.UnreadMessageId).subscribe(
      response => {
        msg.read = true;
      }, error => {
        this.log.error('标记已读失败！', error);
      });
  }

  getMoreMessages() {
    if (this.isShowDivMore === false) {
      return;
    }
    this.pageIndex++;
    const paging = {
      PageIndex: this.pageIndex,
      PageSize: this.pageSize
    };
    this.messageService.getMessages(paging)
      .subscribe(response => {
        if (response && response.data && response.data.length > 0) {
          for (const m of response.data) {
            this.webmessages.push(m);
          }
          this.isShowDivMore = response.count > (paging.PageIndex * paging.PageSize);
        }
      }, error => {
        this.log.error('获取更多消息失败！', error);
      });
  }

  private load() {
    this.route.params.map(params => params.unreadmsgid).subscribe(unreadmsgid => {
      if (this.messageService.hasValue(unreadmsgid)) {
        this.currentMsgId = unreadmsgid;
      } else {
        this.currentMsgId = '';
      }
    });
  }
}
