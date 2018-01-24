import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'rmb'
})
export class RmbPipe implements PipeTransform {

  /**
   *
   */
  constructor(private decimalPipe: DecimalPipe) {

  }

  transform(value: any, digits?: string): string | null {

    if (digits == null || digits === '') {
      digits = '1.2';
    }


    const s = this.decimalPipe.transform(value, digits);

    return `￥${s}`;
  }

}
