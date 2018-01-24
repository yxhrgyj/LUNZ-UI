import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MomentModule } from 'angular2-moment/moment.module';

import { SharedModule } from '../shared/shared.module';

import { WebMessageRoutingModule } from './web-message-routing.module';
import { WebMessageComponent } from './web-message/web-message.component';

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    SharedModule,
    WebMessageRoutingModule
  ],
  declarations: [
    WebMessageComponent
  ]
})
export class WebMessageModule { }
