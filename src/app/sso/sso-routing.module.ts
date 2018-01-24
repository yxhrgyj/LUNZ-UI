import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { SsoCheckComponent } from './sso-check/sso-check.component';

const routes: Routes =
  [{ path: 'auth/check', component: SsoCheckComponent, data: { title: 'authCheck' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SsoRoutingModule { }
