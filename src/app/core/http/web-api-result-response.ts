import { Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { camelCaseObject } from './http-helper';

declare var walk: any;

export interface PagingResponse {
  count: number;
  data: any;
}

export class WebApiResultResponse {

  constructor() { }

  handleSuccess(response: Response): any | PagingResponse {
    let result: any;

    try {
      result = response.json();
    } catch (Error) {
      return response;
    }

    if (result.Success !== undefined) {

      result = camelCaseObject(result);

      if (!result.success) {
        throw new Error(result.allMessages);
      }

      if (result.rowsCount !== undefined) {
        return {
          count: result.rowsCount,
          data: result.data
        };
      } else {
        return result.data;
      }
    } else {
      return result;
    }

  }

  handleError(error: any): Observable<any> {
    if (error.ok === undefined || error.status === undefined || error.statusText === undefined) {
      return Observable.throw(error);
    } else {
      if (error.status && error.status === 400) {
        return Observable.throw(error.json());
      }
      return Observable.throw(error);
    }
  }
}
