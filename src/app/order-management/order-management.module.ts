import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxQueryModule } from '@zhongruigroup/ngx-query';
import { MomentModule } from 'angular2-moment/moment.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { createBsDatepickerConfigProvider } from '../utils/bs-datepicker-config';
import { SharedModule } from '../shared/shared.module';

import { OrderManagementRoutingModule } from './order-management-routing.module';

import { OrdersService } from './shared/orders.service';
import { OrdersComponent } from './partial/orders/orders.component';
import { EditOrderComponent } from './partial/edit-order/edit-order.component';
import { CreateOrderComponent } from './partial/create-order/create-order.component';
import { OrderComponent } from './partial/order/order.component';
import { EditOrderModalComponent } from './partial/edit-order-modal/edit-order-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxQueryModule,
    BsDatepickerModule,
    MomentModule,
    SharedModule,
    OrderManagementRoutingModule
  ],
  declarations: [
    OrdersComponent,
    EditOrderComponent,
    CreateOrderComponent,
    OrderComponent
  ],
  providers: [
    createBsDatepickerConfigProvider(),
    OrdersService
  ]
})
export class OrderManagementModule { }
