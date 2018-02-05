import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';
import { Dialogs } from '../../../core/dialogs.service';
import { NgxDataTableDirective } from '../../../shared/directives/ngx-datatable.directive';

import { OrdersService } from '../../shared/orders.service';

import { EditOrderModalComponent } from '../edit-order-modal/edit-order-modal.component';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {

    log: Logger;
    loading = false;
    orders: Array<any>;
    selectedOrders: Array<any> = [];
    queryTemplates: any = [{
        name: 'Default',
        template: {
            op: 'or',
            rules: [
                { field: 'subject', op: 'cn', data: '' },
                { field: 'Date', op: 'bt' },
                { field: 'Amount', op: 'eq' }
            ],
            groups: []
        }
    }];
    @ViewChild('appNgxDataTable')
    ngxDataTable: NgxDataTableDirective;

    private datatable: any;

    constructor(
        private ordersService: OrdersService,
        private changeDetectorRef: ChangeDetectorRef,
        private loggerFactory: LoggerFactory,
        private dialogs: Dialogs,
        private modalService: BsModalService) {
        this.log = this.loggerFactory.getLogger();
    }

    ngOnInit() { }

    ngAfterViewInit() {
        this.changeDetectorRef.detectChanges();
        this.ngxDataTable.refreshData();
    }
    onSelect(event: any) {
        this.selectedOrders.splice(0, this.selectedOrders.length);
        this.selectedOrders.push(event.selected);
    }
    loadOrders(event: any) {
        const params: any = event.page;
        this.datatable = event.datatable;

        this.loading = true;
        this.ordersService.getOrders(params)
            .finally(() => this.loading = false)
            .subscribe(response => {
                this.datatable.count = response.count;
                this.orders = response.data;
                this.log.debug('订单列表', this.orders);
            }, error => {
                this.log.error('订单获取失败。', error);
            });
    }

    delete(row: any) {
        this.dialogs.confirm(`真的要删除 '${row.subject}' 吗？`).subscribe(
            () => {
                this.ordersService.deleteOrder(row)
                    .subscribe(response => {
                        this.orders.splice(this.orders.indexOf(row), 1);
                        this.datatable.count -= 1;
                        this.log.info('订单删除成功!', row);
                    }, error => this.log.error('订单删除失败123。', error));
            }, () => this.log.debug('取消删除订单。'));
    }

    editByModal(row: any) {
        const onHidden = this.modalService.onHidden.subscribe((reason: string) => {
            this.log.debug('onHidden', reason);
            this.ngxDataTable.refreshData();
            onHidden.unsubscribe();
        });

        const modalRef: BsModalRef = this.modalService.show(EditOrderModalComponent);
        modalRef.content.data = row;
    }
}
