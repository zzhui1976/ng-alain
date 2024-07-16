import { Component, ViewChild, inject } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { ModalHelper } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { SaleOpportunityEditComponent } from './opportunity-edit.component';

@Component({
  selector: 'app-sale-opportunity',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="alain-default__content-title">
      <h1>商机管理</h1>
      <button nz-button (click)="add()" [nzType]="'primary'">添加</button>
    </div>
    <form nz-form nzLayout="inline" se-container>
      <se>
        <input nz-input [(ngModel)]="s.name" name="name" placeholder="商机名称" />
      </se>
      <se>
        <input nz-input [(ngModel)]="s.customer" name="customer" placeholder="客户名称" />
      </se>
      <se>
        <input nz-input [(ngModel)]="s.status" name="status" placeholder="状态" />
      </se>
      <se>
        <button nz-button (click)="st.reset(s)" nzType="primary">搜索</button>
      </se>
    </form>
    <st #st class="bg-white" [columns]="columns" [data]="url" [req]="{ params: s }" />
  `
})
export class SaleOpportunityComponent {
  private readonly msg = inject(NzMessageService);
  private readonly modal = inject(ModalHelper);

  @ViewChild('st', { static: true })
  st!: STComponent;
  s = {
    pi: 1,
    ps: 10,
    name: '',
    customer: '',
    status: ''
  };
  url = '/opportunities';
  columns: STColumn[] = [
    { title: '编号', index: 'id', width: '100px' },
    { title: '商机名称', index: 'name' },
    { title: '客户名称', index: 'customer' },
    { title: '状态', index: 'status' },
    { title: '预计金额', index: 'amount', type: 'currency' },
    { title: '预计成交日期', index: 'expectedDate', type: 'date' },
    { title: '负责人', index: 'owner' },
    { title: '创建日期', index: 'createdDate', type: 'date' },
    { title: '备注', index: 'note' },
    {
      title: '操作',
      width: '180px',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: SaleOpportunityEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        { text: '删除', click: () => this.msg.info('click delete') }
      ]
    }
  ];

  add(): void {
    this.modal.createStatic(SaleOpportunityEditComponent, { i: { id: 0 } }).subscribe(() => {
      this.st.load();
      this.msg.info('回调，重新发起列表刷新');
    });
  }
}
