import { NgModule, Optional, SkipSelf, Injector, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';

import { ModalModule, BsDatepickerModule, TabsModule } from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { MomentModule } from 'angular2-moment/moment.module';
import { NgxQueryModule } from '@zhongruigroup/ngx-query';

import { environment } from '../../environments/environment';
import { createBsDatepickerConfigProvider } from '../utils/bs-datepicker-config';

import { SharedModule } from '../shared/shared.module';

import { CoreRoutingModule } from './core-routing.module';

import { SsoModule } from '../sso/sso.module';
import { WebMessageModule } from '../messages/web-message.module';

import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { I18nService } from './i18n.service';
import { HttpService } from './http/http.service';
import { HttpCacheService } from './http/http-cache.service';
import { Dialogs } from './dialogs.service';
import { LoggerFactory } from './logger-factory.service';
import { SweetAlert2Service } from '../shared/dialogs/sweetalert2.service';
import { SsoServiceService } from '../sso/shared/sso-service.service';

import { MessageService } from '../messages/shared/message.service';
import { OrdersService } from '../order-management/shared/orders.service';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { NavigationComponent } from './shell/navigation/navigation.component';
import { FooterComponent } from './shell/footer/footer.component';
import { PageHeaderComponent } from './shell/page-header/page-header.component';
import { ChangePasswordModalComponent } from '../change-password/change-password-modal/change-password-modal.component';
import { MenuItemComponent } from './shell/navigation/menu-item/menu-item.component';
import { BreadcrumbsComponent } from './shell/breadcrumbs/breadcrumbs.component';
import { SsoRegisterComponent } from '../sso/sso-register/sso-register.component';
import { EditOrderModalComponent } from '../order-management/partial/edit-order-modal/edit-order-modal.component';
import { ProfileComponent } from './shell/header/profile/profile.component';
import { QuickActionsComponent } from './shell/header/quick-actions/quick-actions.component';
import { NotificationsComponent } from './shell/header/notifications/notifications.component';
import { QuickSearchComponent } from './shell/header/quick-search/quick-search.component';
import { TopMenuComponent } from './shell/header/top-menu/top-menu.component';
import { ActionsComponent } from './shell/header/top-menu/actions/actions.component';
import { ReportsComponent } from './shell/header/top-menu/reports/reports.component';
import { AppsComponent } from './shell/header/top-menu/apps/apps.component';
import { MyModuleComponent } from './shell/header/quick-actions/my-module/my-module.component';

export function createHttpService(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    httpCacheService: HttpCacheService,
    router: Router,
    loggerFactory: LoggerFactory,
    injector: Injector) {
    return new HttpService(backend, defaultOptions, httpCacheService, router, loggerFactory, injector);
}

export function createDatePipe() {
    return new DatePipe(environment.localeId);
}

export function createCurrencyPipe() {
    return new CurrencyPipe(environment.localeId);
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        TranslateModule,
        RouterModule,
        NgxQueryModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TabsModule.forRoot(),
        ToastrModule,
        MomentModule,
        SharedModule,
        CoreRoutingModule,
        SsoModule,
        WebMessageModule
    ],
    exports: [
        HeaderComponent
    ],
    declarations: [
        ShellComponent,
        HeaderComponent,
        NavigationComponent,
        FooterComponent,
        PageHeaderComponent,
        ChangePasswordModalComponent,
        MenuItemComponent,
        BreadcrumbsComponent,
        SsoRegisterComponent,
        EditOrderModalComponent,
        ProfileComponent,
        QuickActionsComponent,
        NotificationsComponent,
        QuickSearchComponent,
        TopMenuComponent,
        ActionsComponent,
        ReportsComponent,
        AppsComponent,
        MyModuleComponent
    ],
    entryComponents: [
        ChangePasswordModalComponent,
        EditOrderModalComponent
    ],
    providers: [
        {
            provide: DatePipe,
            deps: [],
            useFactory: createDatePipe
        },
        {
            provide: CurrencyPipe,
            deps: [],
            useFactory: createCurrencyPipe
        },
        AuthenticationService,
        AuthenticationGuard,
        I18nService,
        HttpCacheService,
        {
            provide: Http,
            deps: [XHRBackend, RequestOptions, HttpCacheService, Router, LoggerFactory, Injector],
            useFactory: createHttpService
        },
        createBsDatepickerConfigProvider(),
        Dialogs,
        LoggerFactory,
        SweetAlert2Service,
        SsoServiceService,
        MessageService,
        OrdersService
    ]
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        // Import guard
        if (parentModule) {
            throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
        }
    }
}
