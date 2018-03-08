import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { DatepickerDemoComponent } from './partial/datepicker-demo/datepicker-demo.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'datepicker', component: DatepickerDemoComponent, data: { title: '时间选择器' } },
        []);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class DatepickerRoutingModule { }
