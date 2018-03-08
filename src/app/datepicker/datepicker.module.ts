import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { DatepickerRoutingModule } from './datepicker-routing.module';
import { DatepickerDemoComponent } from './partial/datepicker-demo/datepicker-demo.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DatepickerRoutingModule
    ],
    declarations: [DatepickerDemoComponent]
})
export class DatepickerModule { }
