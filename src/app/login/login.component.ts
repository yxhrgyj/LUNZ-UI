import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import 'rxjs/add/operator/finally';

import { environment } from '../../environments/environment';
import { Logger } from '../core/logger.service';
import { LoggerFactory } from '../core/logger-factory.service';
import { I18nService } from '../core/i18n.service';
import { Dialogs } from '../core/dialogs.service';
import { AuthenticationService } from '../core/authentication/authentication.service';

declare var URI: any;
declare var SnippetLogin: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  log: Logger;
  appName: string = environment.appName;
  version: string = environment.version;
  error: string = null;
  isLoading = false;
  loginForm: FormGroup;
  forgetPassword: Boolean = true;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private dialogs: Dialogs,
    private loggerFactory: LoggerFactory,
    private authenticationService: AuthenticationService) {

    this.log = this.loggerFactory.getLogger('登录');
    this.createForm();
  }

  ngOnInit() { }
  // 忘记密码
  showForgetPassword() {
    this.forgetPassword = !this.forgetPassword;
  }
  login() {
    this.isLoading = true;

    sessionStorage.removeItem('logout');

    this.authenticationService.login(this.loginForm.value)
      .finally(() => {
        this.isLoading = false;
        this.loginForm.markAsPristine();
      })
      .subscribe(credentials => {
        this.log.debug(`${credentials.username} successfully logged in`);

        const uri = new URI(window.location.href);
        const queryString = uri.query();

        if (queryString && queryString !== null && queryString !== '') {
          const query = URI.parseQuery(queryString.toLowerCase());
          if (query.returnurl && query.returnurl !== null && query.returnurl !== '') {
            this.router.navigateByUrl(query.returnurl);
            return;
          }
        }

        this.router.navigate(['/']);
      }, error => {
        this.error = error.message;
        this.log.debug(this.error);
      });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: false
    });
  }

}
