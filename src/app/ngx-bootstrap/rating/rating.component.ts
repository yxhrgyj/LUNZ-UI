import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
})
export class RatingComponent implements OnInit {
  max: number;
  rate: number;
  isStaticReadonly: boolean;
  isReadonly: boolean;
  public overStar: number;
  public percent: number;
  x: number;
  y: number;

  public ratingStates: any = [
    { stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle' },
    { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
    { stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle' },
    { stateOn: 'glyphicon-heart' },
    { stateOff: 'glyphicon-off' }
  ];

  public hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };

  public resetStar(): void {
    this.overStar = void 0;
  }

  constructor() { }

  ngOnInit() {
    this.max = 10;
    this.rate = 7;
    this.x = 5;
    this.y = 2;
    this.isStaticReadonly = true;
    this.isReadonly = false;
  }

  resetRate(): void {
    this.rate = 0;
  }
  reset(): void {
    this.isReadonly = !this.isReadonly;
  }

}
