import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { WebMessageComponent } from './web-message/web-message.component';

const routes: Routes =
  RouteExtensions.withHost(
    { path: 'messages/:unreadmsgid', component: WebMessageComponent, data: { title: '我的消息' } },
    []);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WebMessageRoutingModule { }
