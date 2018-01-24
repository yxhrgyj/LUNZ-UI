import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { OrdersComponent } from './partial/orders/orders.component';
import { CreateOrderComponent } from './partial/create-order/create-order.component';
import { EditOrderComponent } from './partial/edit-order/edit-order.component';
import { OrderComponent } from './partial/order/order.component';

const routes: Routes =
  RouteExtensions.withHost(
      { path: 'orders', component: OrdersComponent, data: { title: '订单管理' } },
      [
        { path: 'new', component: CreateOrderComponent, data: { title: '新建订单' } },
        { path: ':id/edit', component: EditOrderComponent, data: { title: '编辑订单' } },
        { path: ':id', component: OrderComponent, data: { title: '订单详细' } },
      ]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OrderManagementRoutingModule { }
