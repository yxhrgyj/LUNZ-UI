import { Component, Input, OnInit, EventEmitter } from '@angular/core';

import 'rxjs/add/operator/finally';

import { FileManager, FileUploader, Utils, Transfer } from '../lib/ngx-file-uploader/public_api';

import { Dialogs } from '../core/dialogs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public vm: HomeComponent = this;

  quote: string;
  isLoading: boolean;
  username: string;

  constructor(private dialogs: Dialogs) { }

  ngOnInit() {
    // this.isLoading = true;
  }

  alert() {
    this.dialogs.alert('This is a test.', 'Title');
  }

  confirm() {
    this.dialogs.confirm('This is a test.', 'Title')
      .subscribe(success => this.dialogs.success(success), dismiss => this.dialogs.warning(dismiss));
  }

  wait() {
    this.dialogs.wait();
    setTimeout(() => this.dialogs.wait(false), 2000);
  }

  onSuccess(data: any) {
    this.dialogs.success('上传成功! 返回值:' + data);
  }

  onError(errorObs: any) {
    this.dialogs.error(errorObs.error);
  }
}
