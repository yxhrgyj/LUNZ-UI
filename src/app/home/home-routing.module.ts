import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';
import { HomeComponent } from './home.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: HomeComponent, data: { title: '组件库', breadcrumb: false } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class HomeRoutingModule { }
