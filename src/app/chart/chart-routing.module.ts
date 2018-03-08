import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { ChartDemoComponent } from './partial/chart-demo/chart-demo.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'chart', component: ChartDemoComponent, data: { title: '图表' } },
        []);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class ChartRoutingModule { }
