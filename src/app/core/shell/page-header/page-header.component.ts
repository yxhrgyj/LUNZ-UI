import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { environment } from '../../../../environments/environment';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  title: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private i18nService: I18nService) {
    this.init();
  }

  ngOnInit() {

  }

  private init() {

    // Change page title on navigation or language change, based on route data
    const onNavigationEnd = this.router.events.filter(event => event instanceof NavigationEnd);
    Observable.merge(this.translateService.onLangChange, onNavigationEnd)
      .map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(event => {
        const title = event['title'];
        if (title) {
          this.title = this.translateService.instant(title);
        }
      });
  }
}
