import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { VehicleSelectionRoutingModule } from './vehicle-management-demo-routing.module';

import { VehicleSelectionDemoComponent } from './partial/vehicle-selection-demo/vehicle-selection-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        VehicleSelectionRoutingModule
    ],
    declarations: [
        VehicleSelectionDemoComponent,
        UsingDocumentsComponent
    ],
    providers: [
    ]
})

export class VehicleManagementDemoModule { }
