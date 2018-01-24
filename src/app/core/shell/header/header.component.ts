import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/authentication.service';
import { I18nService } from '../../i18n.service';

declare const mLayout: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  menuHidden = true;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService) { }

  ngOnInit() {
    $('body').on('click', '#m_aside_left_minimize_toggle', function () {
      if (!sessionStorage.getItem('logout')) {
        $('.la-refresh').trigger('click');
      };
    });
  }

  ngAfterViewInit() {

    mLayout.initHeader();

  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login']));
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }

}
