import { Component, ViewChild, inject } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { ModalHelper } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { LegalCustomerEditComponent } from './legal-customer-edit.component';

@Component({
  selector: 'app-legal-customer',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="alain-default__content-title">
      <h1>法人客户</h1>
      <button nz-button (click)="add()" [nzType]="'primary'">添加</button>
    </div>
    <form nz-form nzLayout="inline" se-container>
      <se>
        <nz-select [(ngModel)]="s.status" name="status" [nzAllowClear]="false">
          <nz-option nzValue="" nzLabel="状态不限" />
          <nz-option nzValue="1" nzLabel="正常" />
          <nz-option nzValue="2" nzLabel="已取消" />
          <nz-option nzValue="3" nzLabel="已删除" />
        </nz-select>
      </se>
      <se>
        <input nz-input [(ngModel)]="s.name" name="name" placeholder="公司名称" />
      </se>
      <se>
        <input nz-input [(ngModel)]="s.tax_id" name="tax_id" placeholder="税号" />
      </se>
      <se>
        <button nz-button (click)="st.reset(s)" nzType="primary">搜索</button>
      </se>
    </form>
    <st #st class="bg-white" [columns]="columns" [data]="url" [req]="{ params: s }" />
  `
})
export class LegalCustomerComponent {
  private readonly msg = inject(NzMessageService);
  private readonly modal = inject(ModalHelper);

  @ViewChild('st', { static: true })
  st!: STComponent;
  s = {
    pi: 1,
    ps: 10,
    status: '',
    name: '',
    tax_id: ''
  };
  url = '/legal-customers';
  columns: STColumn[] = [
    { title: '编号', index: 'id', width: '100px' },
    { title: '公司名称', index: 'name' },
    { title: '税号', index: 'tax_id' },
    { title: '注册地址', index: 'register_address' },
    { title: '状态', index: 'status_str', width: '100px' },
    {
      title: '操作',
      width: '180px',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: LegalCustomerEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        { text: '删除', click: () => this.msg.info('click delete') }
      ]
    }
  ];

  add(): void {
    this.modal.createStatic(LegalCustomerEditComponent, { i: { id: 0 } }).subscribe(() => {
      this.st.load();
      this.msg.info('回调，重新发起列表刷新');
    });
  }
}
