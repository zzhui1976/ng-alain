import { Component, ViewChild, inject } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { ModalHelper } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { CustomerFamilyEditComponent } from './family-edit.component';

@Component({
  selector: 'app-customer-family',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="alain-default__content-title">
      <h1>家属管理</h1>
      <button nz-button (click)="add()" [nzType]="'primary'">添加</button>
    </div>
    <form nz-form nzLayout="inline" se-container>
      <se>
        <input nz-input [(ngModel)]="s.customerName" name="customerName" placeholder="客户姓名" />
      </se>
      <se>
        <input nz-input [(ngModel)]="s.familyName" name="familyName" placeholder="家属姓名" />
      </se>
      <se>
        <input nz-input [(ngModel)]="s.relation" name="relation" placeholder="关系" />
      </se>
      <se>
        <button nz-button (click)="st.reset(s)" nzType="primary">搜索</button>
      </se>
    </form>
    <st #st class="bg-white" [columns]="columns" [data]="url" [req]="{ params: s }" />
  `
})
export class CustomerFamilyComponent {
  private readonly msg = inject(NzMessageService);
  private readonly modal = inject(ModalHelper);

  @ViewChild('st', { static: true })
  st!: STComponent;
  s = {
    pi: 1,
    ps: 10,
    customerName: '',
    familyName: '',
    relation: ''
  };
  url = '/families';
  columns: STColumn[] = [
    { title: '编号', index: 'id', width: '100px' },
    { title: '客户姓名', index: 'customerName' },
    { title: '家属姓名', index: 'familyName' },
    { title: '关系', index: 'relation' },
    { title: '联系电话', index: 'phone' },
    { title: '邮箱', index: 'email' },
    { title: '地址', index: 'address' },
    { title: '备注', index: 'note' },
    {
      title: '操作',
      width: '180px',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: CustomerFamilyEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        { text: '删除', click: () => this.msg.info('click delete') }
      ]
    }
  ];

  add(): void {
    this.modal.createStatic(CustomerFamilyEditComponent, { i: { id: 0 } }).subscribe(() => {
      this.st.load();
      this.msg.info('回调，重新发起列表刷新');
    });
  }
}
