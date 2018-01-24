import { Injectable, Inject, OpaqueToken, Provider } from '@angular/core';

import { SweetAlertOptions, SweetAlertType } from 'sweetalert2';


export const SWAL_DEFAULTS = new OpaqueToken('SWAL_DEFAULTS');

export function swalDefaultsProvider(options: SweetAlertOptions = {}): Provider {
    return {
        provide: SWAL_DEFAULTS,
        useValue: options
    };
}
