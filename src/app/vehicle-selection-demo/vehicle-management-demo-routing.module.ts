import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { VehicleSelectionDemoComponent } from './partial/vehicle-selection-demo/vehicle-selection-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'vehicle-select', component: VehicleSelectionDemoComponent, data: { title: '车型选择器' } },
        [{ path: 'using-documents', component: UsingDocumentsComponent, data: { title: '车型选择器使用文档' } }]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class VehicleSelectionRoutingModule { }
