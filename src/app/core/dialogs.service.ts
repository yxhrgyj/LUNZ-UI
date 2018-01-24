import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/toPromise';

import { ToastrService, ActiveToast } from 'ngx-toastr';
import swal, { SweetAlertType } from 'sweetalert2';

import { SweetAlert2Service } from '../shared/dialogs/sweetalert2.service';

@Injectable()
export class Dialogs {

  constructor(
    private toastr: ToastrService,
    private sweetAlert2: SweetAlert2Service) {
  }

  /** show successful toast */
  success(message: string, title?: string, optionsOverride?: any): ActiveToast {
    return this.toastr.success(message, title, optionsOverride);
  }

  /** show info toast */
  info(message: string, title?: string, optionsOverride?: any): ActiveToast {
    return this.toastr.info(message, title, optionsOverride);
  }

  /** show warning toast */
  warning(message: string, title?: string, optionsOverride?: any): ActiveToast {
    return this.toastr.warning(message, title, optionsOverride);
  }

  /** show error toast */
  error(message: string, title?: string, optionsOverride?: any): ActiveToast {
    return this.toastr.error(message, title, optionsOverride);
  }

  /** show sweetalert2 as window.alert */
  alert(message: string, title?: string, type?: SweetAlertType): Promise<any> {
    return this.sweetAlert2.show(type || 'info', message, title, undefined, { showCancelButton: false });
  }

  /** show sweetalert2 as window.confirm */
  confirm(message: string, title?: string, type?: SweetAlertType): Observable<any> {
    return new Observable((subscriber: Subscriber<Response>) => {
      this.sweetAlert2.show(type || 'question', message, title, undefined, { showCancelButton: true })
        .then(function (result: any) {
          if (result.value) {
            subscriber.next(result);
          } else {
            subscriber.error(result);
          }
        });
    });
  }

  /** show sweetalert2 as a wait dialog */
  wait(param?: string | boolean): Promise<any> {
    if (param === undefined) {
      param = '处理中，请稍后...';
    }

    const html = `<p><i class="fa fa-spinner fa-pulse fa-4x fa-fw text-info"></i></p>
                  <p class="text-muted">${param}</p>`;

    if (typeof param === 'string') {
      return this.sweetAlert2.show(null, param, null, html, { showConfirmButton: false, showCancelButton: false });
    } else if (typeof param === 'boolean' && param === false) {
      swal.close();
    }
  }
}





