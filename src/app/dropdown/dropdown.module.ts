import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { DropdownRoutingModule } from './dropdown-routing.module';
import { DropdownDemoComponent } from './partial/dropdown-demo/dropdown-demo.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DropdownRoutingModule
    ],
    declarations: [DropdownDemoComponent]
})
export class DropdownModule { }
