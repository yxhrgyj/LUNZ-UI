import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../../../../core/authentication/authentication.service';
import { environment } from '../../../../../environments/environment';
import { WebApiResultResponse, PagingResponse } from '../../../../core/http/web-api-result-response';

@Injectable()
export class VehicleService extends WebApiResultResponse {

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService,
    ) {
        super();

    };

    //获取字母表
    letterList(): Array<any> {
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    };

    //获取车品牌
    getCarbrand(code: string): Observable<any> {
        const url = environment.dataCenter.serverUrl + 'vehicle/Brand/TreeList';

        return this.http.get(url, {
            cache: false,
            params: {
                'appKey': environment.dataCenter.appKey,
                'authToken': this.authenticationService.credentials.token,
                'query': '',
                'code': code
            }
        }).map(super.handleSuccess)
            .catch(super.handleError);
    };

    //获取车系列
    getCarSeries(parentId: string): Observable<any> {
        const url = environment.dataCenter.serverUrl + 'vehicle/Brand/GetChildListByParentId';

        return this.http.get(url, {
            cache: false,
            params: {
                'appKey': environment.dataCenter.appKey,
                'authToken': this.authenticationService.credentials.token,
                'parentId': parentId
            }
        }).map(super.handleSuccess)
            .catch(super.handleError);
    };

    //获取车型号
    getCarModels(seriesId: string): Observable<any> {
        const url = environment.dataCenter.serverUrl + 'vehicle/Info/YearInfoListBySeriesID';

        return this.http.get(url, {
            cache: false,
            params: {
                'appKey': environment.dataCenter.appKey,
                'authToken': this.authenticationService.credentials.token,
                'seriesId': seriesId
            }
        }).map(super.handleSuccess)
            .catch(super.handleError);
    };
};
