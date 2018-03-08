import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

const routes: Routes = RouteExtensions.withShell([
    { path: '', loadChildren: '../home/home.module#HomeModule' },
    { path: '', loadChildren: '../about/about.module#AboutModule' },
    { path: '', loadChildren: '../contact-us/contact-us.module#ContactUsModule' },
    { path: '', loadChildren: '../terms/terms.module#TermsModule' },
    { path: '', loadChildren: '../privacy/privacy.module#PrivacyModule' },
    { path: '', loadChildren: '../help/help.module#HelpModule' },
    { path: '', loadChildren: '../order-management/order-management.module#OrderManagementModule' },
    { path: '', loadChildren: '../messages/web-message.module#WebMessageModule' },
    { path: '', loadChildren: '../ngx-bootstrap/ngx-bootstrap.module#NgxBootstrapModule' },
    { path: '', loadChildren: '../form-validator/form-validator.module#FormValidatorModule' },
    { path: '', loadChildren: '../vehicle-selection-demo/vehicle-management-demo.module#VehicleManagementDemoModule' },
    { path: '', loadChildren: '../file-upload/file-upload.module#FileUploadModule' },
    { path: '', loadChildren: '../chart/chart.module#ChartModule' },
    { path: '', loadChildren: '../datepicker/datepicker.module#DatepickerModule' },
    { path: '', loadChildren: '../dropdown/dropdown.module#DropdownModule' },
    { path: '', loadChildren: '../form/form.module#FormModule' }
])

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
})
export class CoreRoutingModule { }
