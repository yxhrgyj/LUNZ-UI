import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { FromDemoComponent } from './partial/from-demo/from-demo.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'form', component: FromDemoComponent, data: { title: 'form表单' } },
        []);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class FormRoutingModule { }
