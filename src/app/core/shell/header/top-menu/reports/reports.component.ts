import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menu-reports, [app-top-menu-reports]',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  cols: any = 4;
  get width(): any {
    return this.cols < 2 ? 'auto' : this.cols * 250;
  }

  constructor() { }

  ngOnInit() {
  }

}
