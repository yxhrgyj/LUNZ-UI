import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';
import { PrivacyComponent } from './privacy.component';

const routes: Routes = [
  { path: 'privacy', component: PrivacyComponent, data: { title: '隐私与Cookies' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PrivacyRoutingModule { }
