import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/bs-moment';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  // basic
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
  _bsValue: Date;
  get bsValue(): Date {
    return this._bsValue;
  }

  set bsValue(v: Date) {
    this._bsValue = v;
  }

  public colorTheme = 'theme-green';
  public bsConfig: Partial<BsDatepickerConfig>;

  locale = 'en';
  locales = listLocales();
  bsConfigLocale: Partial<BsDatepickerConfig>;

  minDateM: Date;
  maxDateM: Date;

  isDisabled = false;

  datepickerModel: Date;
  daterangepickerModel: Date[];

  // Reactive forms
  myForm: FormGroup;

  _bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
  get bsRangeValue(): any {
    return this._bsRangeValue;
  }

  set bsRangeValue(v: any) {
    this._bsRangeValue = v;
  }

  log(v: any) { console.log(v); }

  // Themes
  applyTheme(pop: any) {
    // create new object on each property change
    // so Angular can catch object reference change
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    setTimeout(() => {
      pop.show();
    });
  }

  // Locales

  applyLocale(pop: any) {
    // create new object on each property change
    // so Angular can catch object reference change
    this.bsConfigLocale = Object.assign({}, { locale: this.locale });
    setTimeout(() => {
      pop.hide();
      pop.show();
    });
  }

  // Max-Min
  constructor(private formBuilder: FormBuilder) {
    this.minDateM = new Date();
    this.maxDateM = new Date();
    this.minDateM.setDate(this.minDateM.getDate() - 1);
    this.maxDateM.setDate(this.maxDateM.getDate() + 7);
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      date: null,
      range: null
    });
  }

}
