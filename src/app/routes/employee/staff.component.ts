import { Component, ViewChild, inject } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { ModalHelper } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { EmployeeStaffEditComponent } from './staff-edit.component';

@Component({
  selector: 'app-employee-staff',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="alain-default__content-title">
      <h1>雇员管理</h1>
      <button nz-button (click)="add()" [nzType]="'primary'">添加</button>
    </div>
    <form nz-form nzLayout="inline" se-container>
      <se>
        <input nz-input [(ngModel)]="s.corporation" name="corporation" placeholder="法人" />
      </se>
      <se>
        <input nz-input [(ngModel)]="s.name" name="name" placeholder="雇员姓名" />
      </se>
      <se>
        <input nz-input [(ngModel)]="s.department" name="department" placeholder="部门" />
      </se>
      <se>
        <button nz-button (click)="st.reset(s)" nzType="primary">搜索</button>
      </se>
    </form>
    <st #st class="bg-white" [columns]="columns" [data]="url" [req]="{ params: s }" />
  `
})
export class EmployeeStaffComponent {
  private readonly msg = inject(NzMessageService);
  private readonly modal = inject(ModalHelper);

  @ViewChild('st', { static: true })
  st!: STComponent;
  s = {
    pi: 1,
    ps: 10,
    corporation: '',
    name: '',
    department: ''
  };
  url = '/staffs';
  columns: STColumn[] = [
    { title: '编号', index: 'id', width: '100px' },
    { title: '法人', index: 'corporation' },
    { title: '雇员姓名', index: 'name' },
    { title: '部门', index: 'department' },
    { title: '职级', index: 'rank' },
    { title: '入职时间', index: 'join_date', type: 'date' },
    {
      title: '操作',
      width: '180px',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: EmployeeStaffEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        { text: '删除', click: () => this.msg.info('click delete') }
      ]
    }
  ];

  add(): void {
    this.modal.createStatic(EmployeeStaffEditComponent, { i: { id: 0 } }).subscribe(() => {
      this.st.load();
      this.msg.info('回调，重新发起列表刷新');
    });
  }
}
