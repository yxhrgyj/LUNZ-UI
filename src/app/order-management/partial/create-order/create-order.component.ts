import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';
import { Dialogs } from '../../../core/dialogs.service';
import { ConvertService } from '../../../shared/converts/convert.service';

import { OrdersService } from '../../shared/orders.service';

@Component({
  selector: 'app-create-order',
  templateUrl: '../edit-order/edit-order.component.html',
  styleUrls: ['../edit-order/edit-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  log: Logger;
  title = '新建订单';
  saving = false;
  form: FormGroup;
  order: any = {};
  hearFromItems: Array<any> = [
    { key: 1, text: '广告' },
    { key: 2, text: '传单' },
    { key: 3, text: '朋友' }
  ];

  constructor(private ordersService: OrdersService,
    private convertService: ConvertService,
    private loggerFactory: LoggerFactory,
    private router: Router, private route: ActivatedRoute, public location: Location,
    private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.log = this.loggerFactory.getLogger();
    this.buildForm();
  }

  ngOnInit() {

    this.order = {
      subject: '',
      date: null,
      hearFrom: 1,
      price: null,
      amount: null
    };

  }

  submit() {

    if (!this.form.valid) {
      this.log.error('表单数据不完整，请检查。');
      return;
    }

    this.saving = true;

    this.ordersService.createOrder(this.order)
      .subscribe(response => {
        this.saving = false;
        this.router.navigate(['/orders']);
        this.log.info('订单创建成功!', response);
      }, error => {
        this.saving = false;
        this.log.error('订单创建失败。', error);
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      subject: [null, [Validators.required, Validators.maxLength(50)]],
      date: [null, [Validators.required]],
      hearFrom: [null, [Validators.required]],
      price: [null, [Validators.required]],
      amount: [null, [Validators.required]]
    });
  }
}
