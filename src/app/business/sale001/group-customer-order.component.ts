import { Component, ViewChild, inject } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { ModalHelper } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { EnumService } from './enum.service';
import { GroupCustomerOrderEditComponent } from './group-customer-order-edit.component';

@Component({
  selector: 'app-sale001-group-customer-order',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="alain-default__content-title">
      <h1>团体客户仓订单</h1>
      <button nz-button (click)="add()" [nzType]="'primary'">添加</button>
    </div>
    <form nz-form nzLayout="inline" se-container>
      <se>
        <nz-select [(ngModel)]="s.status" name="status" [nzAllowClear]="false">
          <nz-option nzValue="" nzLabel="状态不限" />
          <nz-option *ngFor="let item of orderStatusOptions" [nzValue]="item.value" [nzLabel]="item.label" />
        </nz-select>
      </se>
      <se>
        <input nz-input [(ngModel)]="s.customer_name" name="customer_name" placeholder="客户名称" />
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
export class GroupCustomerOrderComponent {
  private readonly msg = inject(NzMessageService);
  private readonly modal = inject(ModalHelper);
  readonly enumService = inject(EnumService);
  orderStatusOptions = this.enumService.getEnumOptions('orderStatus');

  @ViewChild('st', { static: true })
  st!: STComponent;
  s = {
    pi: 1,
    ps: 10,
    customer_name: '',
    status: '',
    order_id: ''
  };
  url = '/sale001/group-customer-order/query';
  columns: STColumn[] = [
    { title: '订单编号', index: 'id', width: '100px' },
    { title: '客户名称', index: 'customer.name' },
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
            component: GroupCustomerOrderEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        {
          text: '查看详情',
          type: 'modal',
          modal: {
            component: GroupCustomerOrderEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        { text: '删除', click: () => this.msg.info('click delete') }
      ]
    }
  ];

  add(): void {
    this.modal.createStatic(GroupCustomerOrderEditComponent, { i: { id: 0, items: [], employees: [] } }).subscribe(() => {
      this.st.load();
      this.msg.info('回调，重新发起列表刷新');
    });
  }
}
