import { Component, OnInit, Output, Input, EventEmitter, ElementRef, Renderer, Injector } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { FileManager, FileUploader, Utils, Transfer } from '../../../lib/ngx-file-uploader/public_api';

import { environment } from '../../../../environments/environment';
import { AuthenticationService, Credentials } from '../../../core/authentication/authentication.service';

declare var URI: any;

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {
  @Output()
  public success: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public error: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public ngValueChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public uploader: FileUploader;
  @Input()
  public ngValue: any;
  @Input()
  public multiple = true;

  public fileLoaded = false;

  _lastFile$: BehaviorSubject<FileManager> = new BehaviorSubject(null);
  private _files$: BehaviorSubject<FileManager[]> = new BehaviorSubject([]);

  constructor(private element: ElementRef,
    private renderer: Renderer,
    private injector: Injector) {
  }

  ngOnInit() {

    this.uploader = new FileUploader(this.getUploadOption());

    this.uploader.onSuccess = (_file: FileManager, _response: any, _status: number, _headers: any) => {
      const result: any = JSON.parse(_response);
      if (result.Success) {
        this.onNgValueChange(result.Data);
        this.success.emit(result.Data);
      } else {
        this.error.emit(Observable.throw(new Error(result.AllMessages)));
      }
    };

    this.uploader.onError = (_file: FileManager, _response: any, _status: number, _headers: any) => {
      if (_response === undefined || _status === undefined) {
        this.error.emit(Observable.throw(_response));
      } else {
        this.error.emit(Observable.throw(new Error(`[${_status}]${_response}`)));
      }
    };

    this._files$.subscribe((data: FileManager[]) => {
      this.fileLoaded = (data.length > 0);
    }, (error: any) => {
      throw new Error(error);
    });

  }

  setFiles(event: any): void {
    this._files$.next(event);
    this.cleanUp();
  }

  private onNgValueChange(val: any) {
    this.ngValue = val;
    this.ngValueChange.emit(this.ngValue);
  }

  private cleanUp(): void {
    const files = this._files$.getValue();
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        const file = files[key];
        if (!file.inQueue) {
          files.splice(+key, 1);
        }
      }
    }
    if (files.length > 0) {
      this._lastFile$.next(files[files.length - 1]);
    }
    if (files.length === 0) {
      this._lastFile$.next(null);
    }
    this._files$.next(files);
  }

  private getUploadOption(): any {
    const authenticationService: AuthenticationService = this.injector.get(AuthenticationService);
    const credentials: Credentials = authenticationService.isAuthenticated() ? authenticationService.credentials : null;
    const token: string = credentials == null ? null : credentials.token;

    let url = environment.serverUrl + 'basic/ResourceItem/Add';
    let headers = {};

    if (environment.withHeaders) {
      headers = {
        'AppKey': environment.appKey,
        'AuthToken': token
      };
    } else {
      const urlParser: any = URI(url);
      if (!urlParser.hasQuery('AppKey')) {
        urlParser.addSearch('AppKey', environment.appKey);
      }
      if (!urlParser.hasQuery('AuthToken')) {
        urlParser.addSearch('AuthToken', token);
      }
      url = urlParser.toString();
    }

    return {
      method: 'POST',
      url: url,
      removeBySuccess: false,
      autoUpload: true,
      headers: headers,
      withCredentials: false,
      alias: 'file'
    };
  }
}
