import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { Logger } from '../../core/logger.service';
import { LoggerFactory } from '../../core/logger-factory.service';
import { Dialogs } from '../../core/dialogs.service';
import { ProfileService } from '../../core/profile/profile.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {

  log: Logger;

  changePassForm: FormGroup;
  isLoading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dialogs: Dialogs,
    private loggerFactory: LoggerFactory,
    private profileService: ProfileService,
    public activeModal: BsModalRef) {
    this.log = this.loggerFactory.getLogger('修改密码');
    this.createForm();
  }

  ngOnInit() {
  }

  changePassword() {
    this.isLoading = true;

    const parmValues = this.changePassForm.value;

    this.profileService.changePassword(parmValues.oldPassword, parmValues.newPassword, parmValues.confirmPassword)
      .finally(() => {
        this.isLoading = false;
        this.changePassForm.markAsPristine();
      })
      .subscribe(credentials => {
        this.log.debug('password successfully modified');
        this.router.navigate(['/login']);
        this.activeModal.hide();
      }, error => {
        this.log.error(error.message);
      });
  }

  validateEqual() {
    if (this.changePassForm.value.newPassword.length >= 6 && this.changePassForm.value.confirmPassword.length >= 6 &&
      this.changePassForm.value.newPassword !== this.changePassForm.value.confirmPassword) {
      return false;
    } else {
      return true;
    }
  }

  private createForm() {
    this.changePassForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
