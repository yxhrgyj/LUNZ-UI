import { Injectable, Inject, OpaqueToken, Provider } from '@angular/core';

import swal, { SweetAlertOptions, SweetAlertType } from 'sweetalert2';

import { SWAL_DEFAULTS } from './sweetalert2.providers';

@Injectable()
export class SweetAlert2Service {

  constructor( @Inject(SWAL_DEFAULTS) private defaultSwalOptions: SweetAlertOptions) { }

  public show(type: SweetAlertType, text: string, title?: string, html?: string,
    options?: SweetAlertOptions): Promise<any> {
    const settings = Object.assign({
      type: type,
      title: title || '',
      text: text,
      html: html || '',
    }, this.defaultSwalOptions, options || {});

    const promise = swal(settings);

    return promise;
  }
}

