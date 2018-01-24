import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';
import { Dialogs } from '../../../core/dialogs.service';

import { OrdersService } from '../../shared/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  log: Logger;
  title = '订单详细';
  form: FormGroup;
  order: any = {};
  hearFromItems: Array<any> = [
    { key: 1, text: '广告' },
    { key: 2, text: '传单' },
    { key: 3, text: '朋友' }
  ];

  constructor(private ordersService: OrdersService,
    private loggerFactory: LoggerFactory,
    private router: Router, private route: ActivatedRoute, public location: Location,
    private formBuilder: FormBuilder) {
    this.log = this.loggerFactory.getLogger();
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.route.params.map(params => params.id).subscribe(id => {
      if (id) {
        this.ordersService.getOrder(id)
          .subscribe(order => {
            this.order = order;
            this.log.debug('成功获取订单！', order);
          }, error => this.log.error('订单获取失败。', error));
      }
    });
  }
}
