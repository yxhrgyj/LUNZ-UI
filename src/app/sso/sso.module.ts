import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SsoRoutingModule } from './sso-routing.module';
import { SsoCheckComponent } from './sso-check/sso-check.component';

@NgModule({
  imports: [
    CommonModule,
    SsoRoutingModule
  ],
  declarations: [
    SsoCheckComponent
  ]
})
export class SsoModule { }
