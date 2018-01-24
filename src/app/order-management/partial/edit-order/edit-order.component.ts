import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';
import { Dialogs } from '../../../core/dialogs.service';
import { ConvertService } from '../../../shared/converts/convert.service';

import { OrdersService } from '../../shared/orders.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  log: Logger;
  title = '编辑订单';
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
    private formBuilder: FormBuilder) {
    this.log = this.loggerFactory.getLogger();
    this.buildForm();
  }

  ngOnInit() {
    this.load();
  }

  submit() {

    if (!this.form.valid) {
      this.log.error('表单数据不完整，请检查。');
      return;
    }

    this.saving = true;

    this.ordersService.updateOrder(this.order)
      .subscribe(response => {
        this.saving = false;
        this.router.navigate(['/orders']);
        this.log.info('成功修改订单!', response);
      }, error => {
        this.saving = false;
        this.log.error('订单保存失败。', error);
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

  private load() {
    this.route.params.map(params => params.id).subscribe(id => {
      if (id) {
        this.ordersService.getOrder(id)
          .subscribe((order: any) => {
            this.order = order;
            this.log.debug('成功获取订单！', order);
          }, error => this.log.error('订单获取失败。', error));
      }
    });
  }
}
