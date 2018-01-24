import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { environment } from '../environments/environment';
import { Logger } from './core/logger.service';
import { I18nService } from './core/i18n.service';
import { LoggerFactory } from './core/logger-factory.service';

@Component({
  selector: 'app-root, body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  log: Logger;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private loggerFactory: LoggerFactory,
    private translateService: TranslateService,
    private i18nService: I18nService) {
    this.log = this.loggerFactory.getLogger('App');
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    this.log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

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
        let title = event['title'];
        if (title) {
          title = `${title} - ${environment.appName}`;
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
  }
}
