import { Component, ViewChild, inject } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { ModalHelper } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { CustomerVisitEditComponent } from './customer-visit-edit.component';
import { EnumService } from './enum.service';

@Component({
  selector: 'app-cust001-customer-visit',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="alain-default__content-title">
      <h1>客户拜访记录管理</h1>
      <button nz-button (click)="add()" [nzType]="'primary'">添加</button>
    </div>
    <form nz-form nzLayout="inline" se-container>
      <se>
        <nz-select [(ngModel)]="s.status" name="status" [nzAllowClear]="false">
          <nz-option nzValue="" nzLabel="状态不限" />
          <nz-option *ngFor="let item of visitStatusOptions" [nzValue]="item.value" [nzLabel]="item.label" />
        </nz-select>
      </se>
      <se>
        <input nz-input [(ngModel)]="s.customer_name" name="customer_name" placeholder="客户名称" />
      </se>
      <se>
        <button nz-button (click)="st.reset(s)" nzType="primary">搜索</button>
      </se>
    </form>
    <st #st class="bg-white" [columns]="columns" [data]="url" [req]="{ params: s }" />
  `
})
export class CustomerVisitComponent {
  private readonly msg = inject(NzMessageService);
  private readonly modal = inject(ModalHelper);
  readonly enumService = inject(EnumService);
  visitStatusOptions = this.enumService.getEnumOptions('visitStatus');

  @ViewChild('st', { static: true })
  st!: STComponent;
  s = {
    pi: 1,
    ps: 10,
    status: '',
    customer_name: ''
  };
  url = '/cust001/customer-visit/query';
  columns: STColumn[] = [
    { title: '拜访ID', index: 'id', width: '100px' },
    { title: '客户名称', index: 'customer.name' },
    { title: '拜访日期', index: 'visit_date', type: 'date' },
    { title: '拜访状态', index: 'visit_status', width: '100px', type: 'enum', enum: this.enumService.getEnum('visitStatus') },
    { title: '客户类型', index: 'customer_type', width: '100px', type: 'enum', enum: this.enumService.getEnum('customerType') },
    { title: '拜访结果', index: 'visit_result', width: '100px', type: 'enum', enum: this.enumService.getEnum('visitResult') },
    {
      title: '操作',
      width: '180px',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: CustomerVisitEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        {
          text: '查看详情',
          type: 'modal',
          modal: {
            component: CustomerVisitEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        { text: '删除', click: () => this.msg.info('click delete') }
      ]
    }
  ];

  add(): void {
    this.modal.createStatic(CustomerVisitEditComponent, { i: { id: 0, items: [], details: [] } }).subscribe(() => {
      this.st.load();
      this.msg.info('回调，重新发起列表刷新');
    });
  }
}
