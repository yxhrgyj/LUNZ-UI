import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

const validationMessages: any = {
  required: '{label}不能为空。',
  email: '请输入有效的Email地址。',
  minLength: '{label}最少为 {length} 个字符。',
  maxlength: '{label}最长为 {length} 个字符。',
  ngbDate: '日期格式不正确。'
};

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {

  @Input()
  formGroup: FormGroup;
  @Input('for')
  formControlName: string;
  @Input()
  control: AbstractControl;
  @Input()
  label: string;
  @Input()
  set validationMessages(val: any) {
    this._validationMessages = val || {};
    for (const prop in validationMessages) {
      if (this._validationMessages[prop] === undefined) {
        this._validationMessages[prop] = validationMessages[prop];
      }
    }
  }
  get validationMessages(): any {
    return this._validationMessages;
  }
  messages: string[];

  private _validationMessages: any;
  private _formControl: AbstractControl;

  constructor() { }

  ngOnInit() {
    if (this.control && this.control !== null) {
      this._formControl = this.control;
    } else {
      this._formControl = this.formGroup.get(this.formControlName);
    }

    if (this._validationMessages === undefined) {
      this.validationMessages = {};
    }

    this._formControl.statusChanges.subscribe(status => this.validate());
  }

  validate(): void {
    const formControl = this._formControl;
    this.messages = [];
    if (formControl && formControl.errors) {
      for (const key in formControl.errors) {
        if (key) {
          const validator = formControl.errors[key];
          this.messages.push(this.getMessage(key, validator));
        }
      }
    }
  }

  private getMessage(key: string, validator: any): string {

    const message: string = this.validationMessages[key];

    const label = this.label;
    let length: any = -1;
    if (validator.requiredLength) {
      length = validator.requiredLength;
    }

    return message
      .replace('{label}', label)
      .replace('{length}', length);
  }
}
