import { Injectable } from '@angular/core';

export interface DateModel {
  year: number;
  month: number;
  day: number;
}

@Injectable()
export class ConvertService {

  constructor() { }

  toDate(dateModel: DateModel): Date {
    return new Date(dateModel.year, dateModel.month - 1, dateModel.day);
  }

  toDateModel(date: Date): DateModel {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }
}
