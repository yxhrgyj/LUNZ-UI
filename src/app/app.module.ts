import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CustomFormsModule } from 'ng2-validation';
import { TranslateModule } from '@ngx-translate/core';
// https://github.com/scttcper/ngx-toastr
import { ToastrModule } from 'ngx-toastr';
// https://github.com/toverux/ngsweetalert2
import { SweetAlertOptions } from 'sweetalert2';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
// https://xuemingfeng.github.io/ngx-query
import { NgxQueryModule } from '@zhongruigroup/ngx-query';
import { SignalRModule, SignalRConfiguration, ConnectionTransports } from 'ng2-signalr';
// https://www.npmjs.com/package/angular2-moment
import * as moment from 'moment';
import { MomentModule } from 'angular2-moment/moment.module';
// https://valor-software.com/ngx-bootstrap
import { BsDatepickerModule, RatingModule, TypeaheadModule, DatepickerConfig } from 'ngx-bootstrap';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { ChangePasswordModule } from './change-password/change-password.module';

const sweetAlertOptions: SweetAlertOptions = {
    buttonsStyling: false,
    allowOutsideClick: false,
    confirmButtonClass: 'btn btn-sm btn-secondary m-btn m-btn--hover-brand m-btn--pill btn-sm m-btn--wide',
    cancelButtonClass: 'btn btn-sm btn-secondary m-btn m-btn--hover-brand m-btn--pill btn-sm m-btn--wide',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
};

const ngxQuerySettings: any = {
    labels: {
        misc: {
            'from': '从',
            'to': '到'
        },
        buttons: {
            'quick': '快速',
            'advanced': '高级',
            'reset': '重置',
            'search': '查询'
        },
        groupOp: {
            'and': '并且',
            'or': '或者'
        },
        fieldOp: {
            'eq': '等于',
            'ne': '不等于',
            'lt': '小于',
            'le': '小于等于',
            'gt': '大于',
            'ge': '大于等于',
            'bw': '开头是',
            'bn': '开头不是',
            'ew': '结尾是',
            'en': '结尾不是',
            'cn': '包含',
            'nc': '不包含',
            'bt': '介于'
        }
    }
};

export function getSignalrConfiguration(): SignalRConfiguration {
    const signalrConfiguration = new SignalRConfiguration();
    signalrConfiguration.hubName = 'WebHub';
    signalrConfiguration.logging = true;
    signalrConfiguration.url = environment.msgCenter.signalR;
    signalrConfiguration.transport = ConnectionTransports.longPolling;
    return signalrConfiguration;
}

moment.locale(environment.localeId);

@NgModule({
    imports: [
        // Angular libraries
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CustomFormsModule,
        HttpModule,
        // 3rd party libraries
        TranslateModule.forRoot(),
        ToastrModule.forRoot({
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-bottom-right'
        }),
        SweetAlert2Module.forRoot(sweetAlertOptions),
        NgxQueryModule.forRoot(ngxQuerySettings),
        SignalRModule.forRoot(getSignalrConfiguration),
        MomentModule,
        BsDatepickerModule.forRoot(),
        RatingModule.forRoot(),
        TypeaheadModule.forRoot(),
        // core libraries
        CoreModule,
        SharedModule.forRoot(sweetAlertOptions),
        LoginModule,
        HomeModule,
        ChangePasswordModule,          // !!!MUST BE LAST ONE!!!
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [
        { provide: LOCALE_ID, useValue: 'zh-CN' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
