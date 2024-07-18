import { NgModule, Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { OrderProductEditComponent } from './order-product-edit.component';
import { PaymentEditComponent } from './payment-edit.component';

@Component({
  selector: 'app-sale-customer-order-edit',
  standalone: true,
  imports: [SharedModule, OrderProductEditComponent, PaymentEditComponent],
  template: `
    <div class="modal-header">
      <div class="modal-title">{{ i.id > 0 ? '编辑' : '添加' }}-个人客户仓订单</div>
    </div>

    <form #f="ngForm" (ngSubmit)="save()" nz-form>
      <div class="scrollable-panel">
        <ng-container>
          <nz-card [nzBordered]="false" nzTitle="订单信息">
            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4" nzFor="customer_name">客户名称</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入客户名称">
                <input
                  nz-input
                  name="customer_name"
                  id="customer_name"
                  placeholder="请输入客户名称"
                  [(ngModel)]="i.customer_name"
                  required
                />
              </nz-form-control>

              <nz-form-label nzSpan="4">订单金额</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入订单金额">
                <nz-input-number name="total_amount" placeholder="请输入订单金额" [(ngModel)]="i.total_amount" required />
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">订单状态</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择订单状态">
                <nz-select name="status" [nzPlaceHolder]="'请选择订单状态'" [nzShowSearch]="true" [(ngModel)]="i.status" required>
                  <nz-option nzValue="1" nzLabel="待支付" />
                  <nz-option nzValue="2" nzLabel="已支付" />
                  <nz-option nzValue="3" nzLabel="已取消" />
                  <nz-option nzValue="4" nzLabel="已完成" />
                </nz-select>
              </nz-form-control>

              <nz-form-label nzSpan="4">订单日期</nz-form-label>
              <nz-form-control nzSpan="8">
                <nz-date-picker name="order_date" [style]="{ width: '100%' }" [(ngModel)]="i.order_date" required />
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">客户地址</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入客户地址">
                <textarea
                  nz-input
                  name="customer_address"
                  placeholder="请输入客户地址"
                  [(ngModel)]="i.customer_address"
                  required
                ></textarea>
              </nz-form-control>

              <nz-form-label nzSpan="4">客户电话</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入客户电话">
                <input nz-input name="customer_phone" placeholder="请输入客户电话" [(ngModel)]="i.customer_phone" required />
              </nz-form-control>
            </nz-form-item>
          </nz-card>
          <nz-card [nzBordered]="false" nzTitle="商品信息">
            <app-order-product-edit #t [items]="i.items" (itemsChange)="i.items = $event" />
            <button nz-button type="button" [nzType]="'dashed'" (click)="t.add()" nzBlock class="mt-md">
              <i nz-icon nzType="plus"></i>
              <span>新增商品</span>
            </button>
          </nz-card>
          <nz-card [nzBordered]="false" nzTitle="付款信息">
            <app-payment-edit #p [items]="i.payments" (itemsChange)="i.payments = $event" />
            <button nz-button type="button" [nzType]="'dashed'" (click)="p.add()" nzBlock class="mt-md">
              <i nz-icon nzType="plus"></i>
              <span>新增付款</span>
            </button>
          </nz-card>
        </ng-container>
      </div>

      <div class="modal-footer">
        <button nz-button type="button" (click)="close()">关闭</button>
        <button nz-button [disabled]="!f.form.valid || !f.form.dirty" [nzLoading]="http.loading" [nzType]="'primary'"> 保存 </button>
      </div>
    </form>
  `,
  styles: [
    `
      .scrollable-panel {
        max-height: 500px; /* 设置固定高度 */
        overflow-y: auto; /* 添加垂直滚动条 */
      }
    `
  ]
})
export class SaleCustomerOrderEditComponent implements OnInit {
  readonly msgSrv = inject(NzMessageService);
  private readonly modal = inject(NzModalRef);
  readonly http = inject(_HttpClient);

  i: any;

  ngOnInit(): void {
    if (this.i.id > 0) {
      this.http.get('/customer-orders').subscribe(res => (this.i = res.list.filter((x: any) => x.id === this.i.id)[0]));
    }
  }

  save(): void {
    this.http.get('/customer-orders').subscribe(() => {
      this.msgSrv.success('保存成功');
      this.modal.destroy(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
