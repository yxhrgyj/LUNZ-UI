import { Component, OnInit, Input, Output, ViewChild, TemplateRef, EventEmitter } from '@angular/core';

import { DatatableComponent } from '@swimlane/ngx-datatable/release/components';

@Component({
  selector: 'app-ngx-datatable-footer',
  templateUrl: './ngx-datatable-footer.component.html',
  styleUrls: ['./ngx-datatable-footer.component.scss']
})
export class NgxDatatableFooterComponent implements OnInit {

  @ViewChild(TemplateRef)
  set template(val: TemplateRef<any>) {
    this._template = val;
    this.update();
  }
  get template(): TemplateRef<any> {
    return this._template;
  }

  @Input()
  set datatable(val: DatatableComponent) {
    this._datatable = val;
    this.update();
  }
  get datatable(): DatatableComponent {
    return this._datatable;
  }

  private _template: TemplateRef<any>;
  private _datatable: DatatableComponent;

  constructor() {
  }

  ngOnInit() {
  }

  private update(): void {
    if (this._datatable && this._template
      && (!this._datatable.footer || !this._datatable.footer.template)) {
      if (this._datatable.footer) {
        this._datatable.footer.template = this._template;
      } else {
        this._datatable.footer = {
          footerHeight: this._datatable.footerHeight,
          totalMessage: this._datatable.messages.totalMessage,
          selectedMessage: this._datatable.messages.selectedMessage,
          pagerLeftArrowIcon: '',
          pagerRightArrowIcon: '',
          pagerPreviousIcon: '',
          pagerNextIcon: '',
          template: this._template
        };
      }
    }
  }
}
