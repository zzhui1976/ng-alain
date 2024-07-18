import { Component, ViewChild, inject } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { ModalHelper } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { SaleCustomerOrderEditComponent } from './customer-order-edit.component';
import { EnumService } from './enum.service';

@Component({
  selector: 'app-sale-customer-order',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="alain-default__content-title">
      <h1>个人客户仓订单</h1>
      <button nz-button (click)="add()" [nzType]="'primary'">添加</button>
    </div>
    <form nz-form nzLayout="inline" se-container>
      <se>
        <nz-select [(ngModel)]="s.status" name="status" [nzAllowClear]="false">
          <nz-option nzValue="" nzLabel="状态不限" />
          <nz-option *ngFor="let item of enumService.getEnumOptions('orderStatus')" [nzValue]="item.value" [nzLabel]="item.label" />
        </nz-select>
      </se>
      <se>
        <input nz-input [(ngModel)]="s.customer_id" name="customer_id" placeholder="客户编号" />
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
export class SaleCustomerOrderComponent {
  private readonly msg = inject(NzMessageService);
  private readonly modal = inject(ModalHelper);
  readonly enumService = inject(EnumService);

  @ViewChild('st', { static: true })
  st!: STComponent;
  s = {
    pi: 1,
    ps: 10,
    customer_id: '',
    status: '',
    order_id: ''
  };
  url = '/customer-orders';
  columns: STColumn[] = [
    { title: '订单编号', index: 'id', width: '100px' },
    { title: '客户名称', index: 'customer_name' },
    { title: '订单金额', index: 'total_amount' },
    { title: '订单状态', index: 'status', width: '100px', type: 'enum', enum: this.enumService.getEnum('orderStatus') },
    {
      title: '操作',
      width: '180px',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: SaleCustomerOrderEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        {
          text: '查看详情',
          type: 'modal',
          modal: {
            component: SaleCustomerOrderEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        { text: '删除', click: () => this.msg.info('click delete') }
      ]
    }
  ];

  //constructor(private enumService: EnumService) {}

  add(): void {
    this.modal.createStatic(SaleCustomerOrderEditComponent, { i: { id: 0, items: [] } }).subscribe(() => {
      this.st.load();
      this.msg.info('回调，重新发起列表刷新');
    });
  }
}
