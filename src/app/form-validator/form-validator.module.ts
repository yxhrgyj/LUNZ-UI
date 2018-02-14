import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomFormsModule } from 'ng2-validation';

import { SharedModule } from '../shared/shared.module';

import { FormValidatorRoutingModule } from './form-validator-routing.module';
import { FormValidatorComponent } from './partial/form-validator/form-validator.component';
import { RequiredValidatorComponent } from './partial/required-validator/required-validator.component';
import { MinLengthValidatorComponent } from './partial/min-length-validator/min-length-validator.component';
import { MaxLengthValidatorComponent } from './partial/max-length-validator/max-length-validator.component';
import { RangeLengthValidatorComponent } from './partial/range-length-validator/range-length-validator.component';
import { NumberValidatorComponent } from './partial/number-validator/number-validator.component';
import { UrlValidatorComponent } from './partial/url-validator/url-validator.component';
import { EmailValidatorComponent } from './partial/email-validator/email-validator.component';
import { DateValidatorComponent } from './partial/date-validator/date-validator.component';
import { MinDateValidatorComponent } from './partial/min-date-validator/min-date-validator.component';
import { MaxDateValidatorComponent } from './partial/max-date-validator/max-date-validator.component';
import { PhoneValidatorComponent } from './partial/phone-validator/phone-validator.component';
import { EqualToValidatorComponent } from './partial/equal-to-validator/equal-to-validator.component';
import { NotEqualToValidatorComponent } from './partial/not-equal-to-validator/not-equal-to-validator.component';
import { CustomPatternValidatorComponent } from './partial/custom-pattern-validator/custom-pattern-validator.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        CustomFormsModule,
        FormValidatorRoutingModule
    ],

    declarations: [
        FormValidatorComponent,
        RequiredValidatorComponent,
        MinLengthValidatorComponent,
        MaxLengthValidatorComponent,
        RangeLengthValidatorComponent,
        NumberValidatorComponent,
        UrlValidatorComponent,
        EmailValidatorComponent,
        DateValidatorComponent,
        MinDateValidatorComponent,
        MaxDateValidatorComponent,
        PhoneValidatorComponent,
        EqualToValidatorComponent,
        NotEqualToValidatorComponent,
        CustomPatternValidatorComponent
    ]
})

export class FormValidatorModule { }
