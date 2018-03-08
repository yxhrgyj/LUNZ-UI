import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ChartRoutingModule } from './chart-routing.module';

import { ChartDemoComponent } from './partial/chart-demo/chart-demo.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ChartRoutingModule
    ],
    declarations: [
        ChartDemoComponent
    ]
})
export class ChartModule { }
