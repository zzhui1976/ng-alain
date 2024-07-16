import { NgModule, Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-sale-product-edit',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="modal-header">
      <div class="modal-title">{{ i.id > 0 ? '编辑' : '添加' }}-产品</div>
    </div>

    <form #f="ngForm" (ngSubmit)="save()" nz-form>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">产品名称</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.name" name="name" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">产品类别</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.category" name="category" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">品牌</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.brand" name="brand" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">型号</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.model" name="model" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">价格</nz-form-label>
        <nz-form-control nzSpan="8">
          <nz-input-number [(ngModel)]="i.price" name="price" [nzMin]="0" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">库存</nz-form-label>
        <nz-form-control nzSpan="8">
          <nz-input-number [(ngModel)]="i.stock" name="stock" [nzMin]="0" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">生产日期</nz-form-label>
        <nz-form-control nzSpan="8">
          <nz-date-picker [(ngModel)]="i.productionDate" name="productionDate" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">保质期</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.shelfLife" name="shelfLife" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">供应商</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.supplier" name="supplier" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">备注</nz-form-label>
        <nz-form-control nzSpan="8">
          <textarea nz-input [(ngModel)]="i.note" name="note" required></textarea>
        </nz-form-control>
      </nz-form-item>
      <div class="modal-footer">
        <button nz-button type="button" (click)="close()">关闭</button>
        <button nz-button [disabled]="!f.form.valid || !f.form.dirty" [nzLoading]="http.loading" [nzType]="'primary'"> 保存 </button>
      </div>
    </form>
  `
})
export class SaleProductEditComponent implements OnInit {
  readonly msgSrv = inject(NzMessageService);
  private readonly modal = inject(NzModalRef);
  readonly http = inject(_HttpClient);

  i: any;

  ngOnInit(): void {
    if (this.i.id > 0) {
      this.http.get('/products').subscribe(res => (this.i = res.list.filter((x: any) => x.id === this.i.id)[0]));
    }
  }

  save(): void {
    this.http.get('/products').subscribe(() => {
      this.msgSrv.success('保存成功');
      this.modal.destroy(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
