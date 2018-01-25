import { Component, OnInit, Input } from '@angular/core';

import { QueryComponent } from '@zhongruigroup/ngx-query/query.component';
import { QueryMode } from '@zhongruigroup/ngx-query/query.types';

@Component({
  selector: 'app-ngx-query-toolbar',
  templateUrl: './ngx-query-toolbar.component.html',
  styleUrls: ['./ngx-query-toolbar.component.scss']
})
export class NgxQueryToolbarComponent implements OnInit {

  @Input() ngxQuery: QueryComponent;
  @Input() visible = false;

  constructor() { }

  ngOnInit() {
  }

  showNgxQuery() {
    this.visible = true;
  }

  hideNgxQuery() {
    this.visible = false;
  }

  isPlainMode() {
    return this.ngxQuery.mode === QueryMode.plain;
  }

  isAdvancedMode() {
    return this.ngxQuery.mode === QueryMode.advanced;
  }

  setPlainMode() {
    this.ngxQuery.mode = QueryMode.plain;
  }

  setAdvancedMode() {
    this.ngxQuery.mode = QueryMode.advanced;
  }

  reset() {
    this.ngxQuery.resetQueryTemplate();
  }

  search() {
    this.ngxQuery.executeQuery();
  }
}
