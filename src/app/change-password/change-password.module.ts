import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileService } from '../core/profile/profile.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    ProfileService
  ]
})
export class ChangePasswordModule { }
