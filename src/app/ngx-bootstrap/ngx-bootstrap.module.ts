import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule, BsDatepickerModule, TypeaheadModule } from 'ngx-bootstrap';
import { MomentModule } from 'angular2-moment/moment.module';

import { createBsDatepickerConfigProvider } from '../utils/bs-datepicker-config';

import { NgxBootstrapRoutingModule } from './ngx-bootstrap-routing.module';
import { NgxBootstrapComponent } from './ngx-bootstrap.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { RatingComponent } from './rating/rating.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    MomentModule,
    BsDatepickerModule,
    TypeaheadModule,
    NgxBootstrapRoutingModule,
  ],
  declarations: [
    NgxBootstrapComponent,
    DatePickerComponent,
    RatingComponent,
    TypeaheadComponent,
  ],
  providers: [
    createBsDatepickerConfigProvider()
  ]
})
export class NgxBootstrapModule {

}
