import {
  OnInit, Directive,
  Input, Output,
  ViewContainerRef, EventEmitter
} from '@angular/core';

import { BsDatepickerComponent } from 'ngx-bootstrap/datepicker';

import { environment } from '../../../environments/environment';

@Directive({
  selector: '[app-bs-date-value], [bsDateValue]'
})
export class BsDateValueDirective implements OnInit {

  @Output() bsDateValueChange: EventEmitter<string> = new EventEmitter();

  @Input('bsDateValue')
  set bsDateValue(value: string) {
    this.setDate(value);
  }

  private get datepicker(): BsDatepickerComponent {

    if (this._datepicker === undefined || this._datepicker === null) {
      this._datepicker = (<any>this._view)._data.componentView.component;
    }

    this.configDatepicker();

    return this._datepicker;
  }

  private _datepicker: BsDatepickerComponent;
  private _value: string;

  constructor(private _view: ViewContainerRef) { }

  ngOnInit() {
    const self = this;

    this.datepicker.bsValueChange.subscribe(function (date: Date) {
      let value: string;

      if (date && date !== null) {
        value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }

      self.bsDateValue = value;
    });
  }

  private setDate(value: string): void {

    if (value === this._value) {
      return;
    }

    let date: Date;
    if (value && value !== null) {
      date = new Date(value);
    }

    this._value = value;
    this.datepicker.bsValue = date;

    this.bsDateValueChange.emit(value);
  }

  private configDatepicker(): void {
    if (this._datepicker && this._datepicker._config.locale !== environment.localeId) {
      const config = Object.assign(this._datepicker._config, {
        locale: environment.localeId,
        containerClass: 'theme-blue'
      });

      this._datepicker._config = config;
    }
  }
}
