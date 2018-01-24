import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';

import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-sso-register',
  templateUrl: './sso-register.component.html',
  styleUrls: ['./sso-register.component.scss']
})
export class SsoRegisterComponent implements OnInit {

  public isCookie = false;
  public srcUrl: any;

  constructor(private sanitizer: DomSanitizer,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    const token = this.authenticationService.credentials.token;
    if (token && token !== undefined && token !== '') {
      this.isCookie = true;
      const url = environment.userCenter.authUri + 'Auth/CreateAuthToken?authToken=' + token;
      this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

}
