import { Component, ViewChild, inject } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { ModalHelper } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { SaleWarehouseEditComponent } from './warehouse-edit.component';

@Component({
  selector: 'app-sale-warehouse',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="alain-default__content-title">
      <h1>仓库</h1>
      <button nz-button (click)="add()" [nzType]="'primary'">添加</button>
    </div>
    <form nz-form nzLayout="inline" se-container>
      <se>
        <nz-select [(ngModel)]="s.status" name="status" [nzAllowClear]="false">
          <nz-option nzValue="" nzLabel="状态不限" />
          <nz-option nzValue="1" nzLabel="正常" />
          <nz-option nzValue="2" nzLabel="已取消" />
          <nz-option nzValue="3" nzLabel="已删除" />
          <nz-option nzValue="10" nzLabel="待提交" />
          <nz-option nzValue="11" nzLabel="待审核" />
        </nz-select>
      </se>
      <se>
        <input nz-input [(ngModel)]="s.manager_id" name="manager_id" placeholder="管理员编号" />
      </se>
      <se>
        <input nz-input [(ngModel)]="s.q" name="q" placeholder="仓库名称" />
      </se>
      <se>
        <button nz-button (click)="st.reset(s)" nzType="primary">搜索</button>
      </se>
    </form>
    <st #st class="bg-white" [columns]="columns" [data]="url" [req]="{ params: s }" />
  `
})
export class SaleWarehouseComponent {
  private readonly msg = inject(NzMessageService);
  private readonly modal = inject(ModalHelper);

  @ViewChild('st', { static: true })
  st!: STComponent;
  s = {
    pi: 1,
    ps: 10,
    manager_id: '',
    status: '',
    q: ''
  };
  url = '/warehouses';
  columns: STColumn[] = [
    { title: '编号', index: 'id', width: '100px' },
    { title: '仓库名称', index: 'name' },
    { title: '管理员', index: 'manager' },
    { title: '状态', index: 'status_str', width: '100px' },
    {
      title: '操作',
      width: '180px',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: SaleWarehouseEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        {
          text: '查看详情',
          type: 'modal',
          modal: {
            component: SaleWarehouseEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        { text: '删除', click: () => this.msg.info('click delete') },
        {
          text: '更多',
          children: [
            {
              text: record => (record.id === 1 ? `过期` : `正常`),
              click: record => this.msg.error(`${record.id === 1 ? `过期` : `正常`}【${record.name}】`)
            },
            {
              text: `审核`,
              click: record => this.msg.info(`check-${record.name}`),
              iif: record => record.id % 2 === 0,
              iifBehavior: 'disabled',
              tooltip: 'This is tooltip'
            },
            {
              type: 'divider'
            },
            {
              text: `重新开始`,
              icon: 'edit',
              click: record => this.msg.success(`重新开始【${record.name}】`)
            }
          ]
        }
      ]
    }
  ];

  add(): void {
    this.modal.createStatic(SaleWarehouseEditComponent, { i: { id: 0, items: [] } }).subscribe(() => {
      this.st.load();
      this.msg.info('回调，重新发起列表刷新');
    });
  }
}
