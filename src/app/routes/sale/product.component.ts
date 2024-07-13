import { Component, ViewChild, inject } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { ModalHelper } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { SaleProductEditComponent } from './product-edit.component';

@Component({
  selector: 'app-sale-product',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="alain-default__content-title">
      <h1>产品管理</h1>
      <button nz-button (click)="add()" [nzType]="'primary'">添加</button>
    </div>
    <form nz-form nzLayout="inline" se-container>
      <se>
        <input nz-input [(ngModel)]="s.name" name="name" placeholder="产品名称" />
      </se>
      <se>
        <input nz-input [(ngModel)]="s.category" name="category" placeholder="产品类别" />
      </se>
      <se>
        <input nz-input [(ngModel)]="s.brand" name="brand" placeholder="品牌" />
      </se>
      <se>
        <button nz-button (click)="st.reset(s)" nzType="primary">搜索</button>
      </se>
    </form>
    <st #st class="bg-white" [columns]="columns" [data]="url" [req]="{ params: s }" />
  `
})
export class SaleProductComponent {
  private readonly msg = inject(NzMessageService);
  private readonly modal = inject(ModalHelper);

  @ViewChild('st', { static: true })
  st!: STComponent;
  s = {
    pi: 1,
    ps: 10,
    name: '',
    category: '',
    brand: ''
  };
  url = '/products';
  columns: STColumn[] = [
    { title: '编号', index: 'id', width: '100px' },
    { title: '产品名称', index: 'name' },
    { title: '产品类别', index: 'category' },
    { title: '品牌', index: 'brand' },
    { title: '型号', index: 'model' },
    { title: '价格', index: 'price', type: 'currency' },
    { title: '库存', index: 'stock' },
    { title: '生产日期', index: 'productionDate', type: 'date' },
    { title: '保质期', index: 'shelfLife' },
    { title: '供应商', index: 'supplier' },
    { title: '备注', index: 'note' },
    {
      title: '操作',
      width: '180px',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: SaleProductEditComponent,
            paramsName: 'i'
          },
          click: () => this.msg.info('回调，重新发起列表刷新')
        },
        { text: '删除', click: () => this.msg.info('click delete') }
      ]
    }
  ];

  add(): void {
    this.modal.createStatic(SaleProductEditComponent, { i: { id: 0 } }).subscribe(() => {
      this.st.load();
      this.msg.info('回调，重新发起列表刷新');
    });
  }
}
