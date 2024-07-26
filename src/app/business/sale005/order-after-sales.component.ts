import { Component, ViewChild, inject } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { ModalHelper } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { EnumService } from './enum.service';
import { OrderAfterSalesEditComponent } from './order-after-sales-edit.component';

@Component({
  selector: 'app-sale005-order-after-sales',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="alain-default__content-title">
      <h1>订单售后管理</h1>
      <button nz-button (click)="add()" [nzType]="'primary'">添加</button>
    </div>
    <form nz-form nzLayout="inline" se-container>
      <se>
        <nz-select [(ngModel)]="s.status" name="status" [nzAllowClear]="false">
          <nz-option nzValue="" nzLabel="状态不限" />
          <nz-option *ngFor="let item of paymentStatusOptions" [nzValue]="item.value" [nzLabel]="item.label" />
        </nz-select>
      </se>
      <se>
        <input nz-input [(ngModel)]="s.order_id" name="order_id" placeholder="订单编号" />
      </se>
      <se>
        <button nz-button (click)="st.reset(s)" nzType="primary">搜索</button>
      </se>
    </form>
    <st #st class="bg-white" [columns]="columns" [data]="url" [req]="{ params: s }" />
  `
})
export class OrderAfterSalesComponent {
  private readonly msg = inject(NzMessageService);
  private readonly modal = inject(ModalHelper);
  readonly enumService = inject(EnumService);
  paymentStatusOptions = this.enumService.getEnumOptions('paymentStatus');

  @ViewChild('st', { static: true })
  st!: STComponent;
  s = {
    pi: 1,
    ps: 10,
    status: '',
    order_id: ''
  };
  url = '/sale005/order-after-sales/query';
  columns: STColumn[] = [
    { title: '订单编号', index: 'id', width: '100px' },
    { title: '客户名称', index: 'customer.name' },
    { title: '订单金额', index: 'total_amount' },
    { title: '支付状态', index: 'payment_status', width: '100px', type: 'enum', enum: this.enumService.getEnum('paymentStatus') },
    { title: '发货状态', index: 'delivery_status', width: '100px', type: 'enum', enum: this.enumService.getEnum('deliveryStatus') },
    { title: '退换状态', index: 'return_status', width: '100px', type: 'enum', enum: this.enumService.getEnum('returnStatus') },
    {
      title: '操作',
      width: '180px',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: OrderAfterSalesEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        {
          text: '查看详情',
          type: 'modal',
          modal: {
            component: OrderAfterSalesEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        { text: '删除', click: () => this.msg.info('click delete') }
      ]
    }
  ];

  add(): void {
    this.modal
      .createStatic(OrderAfterSalesEditComponent, { i: { id: 0, items: [], payments: [], deliveries: [], returns: [] } })
      .subscribe(() => {
        this.st.load();
        this.msg.info('回调，重新发起列表刷新');
      });
  }
}
