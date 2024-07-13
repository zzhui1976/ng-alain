import { Component, ViewChild, inject } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { ModalHelper } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { CustomerEnterpriseEditComponent } from './enterprise-edit.component';

@Component({
  selector: 'app-customer-enterprise',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="alain-default__content-title">
      <h1>企业管理</h1>
      <button nz-button (click)="add()" [nzType]="'primary'">添加</button>
    </div>
    <form nz-form nzLayout="inline" se-container>
      <se>
        <input nz-input [(ngModel)]="s.name" name="name" placeholder="企业名称" />
      </se>
      <se>
        <input nz-input [(ngModel)]="s.industry" name="industry" placeholder="行业" />
      </se>
      <se>
        <input nz-input [(ngModel)]="s.address" name="address" placeholder="地址" />
      </se>
      <se>
        <button nz-button (click)="st.reset(s)" nzType="primary">搜索</button>
      </se>
    </form>
    <st #st class="bg-white" [columns]="columns" [data]="url" [req]="{ params: s }" />
  `
})
export class CustomerEnterpriseComponent {
  private readonly msg = inject(NzMessageService);
  private readonly modal = inject(ModalHelper);

  @ViewChild('st', { static: true })
  st!: STComponent;
  s = {
    pi: 1,
    ps: 10,
    name: '',
    industry: '',
    address: ''
  };
  url = '/enterprises';
  columns: STColumn[] = [
    { title: '编号', index: 'id', width: '100px' },
    { title: '企业名称', index: 'name' },
    { title: '行业', index: 'industry' },
    { title: '地址', index: 'address' },
    { title: '联系电话', index: 'phone' },
    { title: '邮箱', index: 'email' },
    { title: '法人代表', index: 'legalRepresentative' },
    { title: '注册资本', index: 'registeredCapital' },
    { title: '成立日期', index: 'establishmentDate', type: 'date' },
    { title: '经营范围', index: 'businessScope' },
    { title: '备注', index: 'note' },
    {
      title: '操作',
      width: '180px',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: CustomerEnterpriseEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        { text: '删除', click: () => this.msg.info('click delete') }
      ]
    }
  ];

  add(): void {
    this.modal.createStatic(CustomerEnterpriseEditComponent, { i: { id: 0 } }).subscribe(() => {
      this.st.load();
      this.msg.info('回调，重新发起列表刷新');
    });
  }
}
