import { Component, ViewChild, inject } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { ModalHelper } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { SalePoiEditComponent } from './poi-edit.component';

@Component({
  selector: 'app-sale-poi',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="alain-default__content-title">
      <h1>门店</h1>
      <button nz-button (click)="add()" [nzType]="'primary'">添加</button>
    </div>
    <form nz-form nzLayout="inline" se-container>
      <se>
        <nz-select [(ngModel)]="s.s" name="s" [nzAllowClear]="false">
          <nz-option nzValue="" nzLabel="状态不限" />
          <nz-option nzValue="1" nzLabel="正常" />
          <nz-option nzValue="2" nzLabel="已取消" />
          <nz-option nzValue="3" nzLabel="已删除" />
          <nz-option nzValue="10" nzLabel="待提交" />
          <nz-option nzValue="11" nzLabel="待审核" />
        </nz-select>
      </se>
      <se>
        <input nz-input [(ngModel)]="s.user_id" name="user_id" placeholder="用户编号" />
      </se>
      <se>
        <input nz-input [(ngModel)]="s.q" name="q" placeholder="门店、分店名称" />
      </se>
      <se>
        <button nz-button (click)="st.reset(s)" nzType="primary">搜索</button>
      </se>
    </form>
    <st #st class="bg-white" [columns]="columns" [data]="url" [req]="{ params: s }" />
  `
})
export class SalePoiComponent {
  private readonly msg = inject(NzMessageService);
  private readonly modal = inject(ModalHelper);

  @ViewChild('st', { static: true })
  st!: STComponent;
  s = {
    pi: 1,
    ps: 10,
    user_id: '',
    s: '',
    q: ''
  };
  url = '/pois';
  columns: STColumn[] = [
    { title: '编号', index: 'id', width: '100px' },
    { title: '门店名称', index: 'name' },
    { title: '分店名', index: 'branch_name' },
    { title: '状态', index: 'status_str', width: '100px' },
    {
      title: '操作',
      width: '180px',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: SalePoiEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        { text: '图片', click: () => this.msg.info('click photo') },
        { text: '经营SKU', click: () => this.msg.info('click sku') }
      ]
    }
  ];

  add(): void {
    this.modal.createStatic(SalePoiEditComponent, { i: { id: 0 } }).subscribe(() => {
      this.st.load();
      this.msg.info('回调，重新发起列表刷新');
    });
  }
}
