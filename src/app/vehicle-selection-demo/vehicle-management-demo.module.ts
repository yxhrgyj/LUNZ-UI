import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { VehicleSelectionRoutingModule } from './vehicle-management-demo-routing.module';
import { VehicleService } from '../shared/components/vehicle-selection/vehicle-selection-sevice/vehicle.service';

import { VehicleSelectionDemoComponent } from './partial/vehicle-selection-demo/vehicle-selection-demo.component';
import { VehicleSelectionComponent } from '../shared/components/vehicle-selection/vehicle-selection.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        VehicleSelectionRoutingModule
    ],
    declarations: [
        VehicleSelectionDemoComponent,
        VehicleSelectionComponent,
        UsingDocumentsComponent
    ],
    providers: [
        VehicleService
    ]
})

export class VehicleManagementDemoModule { }
