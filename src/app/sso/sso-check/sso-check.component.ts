import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../core/authentication/authentication.service';

declare var URI: any;

@Component({
  selector: 'app-sso-check',
  templateUrl: './sso-check.component.html',
  styleUrls: ['./sso-check.component.scss']
})
export class SsoCheckComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    let returnUrl = '/';
    const uri = new URI(window.location.href);
    const queryString = uri.query();
    if (queryString && queryString !== null && queryString !== '') {
      const query = URI.parseQuery(queryString.toLowerCase());
      if (query.returnurl && query.returnurl !== null && query.returnurl !== '') {
        returnUrl = query.returnurl;
      }
      if (query.authtoken && query.authtoken !== null && query.authtoken !== '') {
        sessionStorage.setItem('SingleWebSiteLogin', 'Yes');
        this.loginByAuthToken(returnUrl, query.authtoken);
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  private loginByAuthToken(returnUrl: string, authToken: string) {
    this.authenticationService.loginByAuthToken(authToken)
      .subscribe(order => {
        this.router.navigate([returnUrl]);
      }, error => { this.router.navigate(['/login']); });
  }
}
