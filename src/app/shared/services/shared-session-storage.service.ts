import { Injectable } from '@angular/core';

@Injectable()
export class SharedSessionStorageService {

  private _expiredKey = 'SHARED_SESSION_STORAGE_EXPIRED';
  private _dataKey = 'SHARED_SESSION_STORAGE_DATA';
  private _duration = 300;

  constructor() {
    this.setData(this.getData());
    this.refresh();
  }

  setItem(key: string, value: any): void {
    const data: any = this.getData();
    data[key] = value;
    this.setData(data);
  }

  getItem(key: string): any {
    const data: any = this.getData();
    return data[key];
  }

  removeItem(key?: string): void {
    if (key) {
      const data: any = this.getData();
      data[key] = undefined;
      this.setData(data);
    } else {
      localStorage.removeItem(this._expiredKey);
      localStorage.removeItem(this._dataKey);
    }
  }

  private getData(): any {
    const expiredStr = localStorage.getItem(this._expiredKey);
    if (!expiredStr || expiredStr === '' || new Date(JSON.parse(expiredStr).date) < new Date()) {
      this.removeItem();
      return {};
    }

    const dataStr = localStorage.getItem(this._dataKey);
    if (!dataStr || dataStr === '') {
      return {};
    }

    return JSON.parse(dataStr);
  }

  private setData(data: any): void {
    if (data) {
      localStorage.setItem(this._expiredKey, JSON.stringify({ date: this.getExpired() }));
      localStorage.setItem(this._dataKey, JSON.stringify(data));
    }
  }

  private getExpired(): Date {
    const expired = new Date();
    expired.setSeconds(expired.getSeconds() + this._duration + 10);
    return expired;
  }

  private refresh() {
    window.setTimeout(() => {
      this.setData(this.getData());
      this.refresh();
    }, this._duration * 1000);
  }
}
