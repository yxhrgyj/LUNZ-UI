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
  // EXAMPLE
  // { path: 'express/list', redirectTo: '/reference-data/express/list', pathMatch: 'full' },
  { path: '', loadChildren: '../messages/web-message.module#WebMessageModule' },
  { path: '', loadChildren: '../ngx-bootstrap/ngx-bootstrap.module#NgxBootstrapModule' }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
  ]
})
export class CoreRoutingModule { }
