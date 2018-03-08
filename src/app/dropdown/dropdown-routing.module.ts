import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { DropdownDemoComponent } from './partial/dropdown-demo/dropdown-demo.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'dropdown', component: DropdownDemoComponent, data: { title: 'dropdown' } },
        []);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class DropdownRoutingModule { }
