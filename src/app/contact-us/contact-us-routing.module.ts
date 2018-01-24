import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';
import { ContactUsComponent } from './contact-us.component';

const routes: Routes = [
  { path: 'contact-us', component: ContactUsComponent, data: { title: '联系我们' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ContactUsRoutingModule { }
