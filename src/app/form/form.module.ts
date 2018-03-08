import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { FormRoutingModule } from './form-routing.module';

import { FromDemoComponent } from './partial/from-demo/from-demo.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormRoutingModule
    ],
    declarations: [FromDemoComponent]
})
export class FormModule { }
