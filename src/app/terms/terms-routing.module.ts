import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';
import { TermsComponent } from './terms.component';

const routes: Routes = [
  { path: 'terms', component: TermsComponent, data: { title: '使用条款' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TermsRoutingModule { }
