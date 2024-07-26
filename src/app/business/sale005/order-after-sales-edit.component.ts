import { NgModule, Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { EnumService } from './enum.service';

@Component({
  selector: 'app-sale005-order-after-sales-edit',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="modal-header">
      <div class="modal-title">{{ i.id > 0 ? '编辑' : '添加' }}-订单售后管理</div>
    </div>

    <form #f="ngForm" (ngSubmit)="save()" nz-form>
      <div class="scrollable-panel">
        <ng-container>
          <nz-card [nzBordered]="false" nzTitle="订单信息">
            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4" nzFor="customer_name">客户名称</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入客户名称">
                <nz-select
                  nzShowSearch
                  [(ngModel)]="i.customer"
                  name="customer_name"
                  [compareWith]="compareFn"
                  nzAllowClear
                  nzPlaceHolder="请选择"
                >
                  <nz-option *ngFor="let item of customerList" [nzValue]="item" [nzLabel]="item.name" [nzHide]="item.hide" />
                </nz-select>
              </nz-form-control>

              <nz-form-label nzSpan="4">订单金额</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入订单金额">
                <nz-input-number name="total_amount" placeholder="请输入订单金额" [(ngModel)]="i.total_amount" required />
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">支付状态</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择支付状态">
                <nz-select
                  name="payment_status"
                  [nzPlaceHolder]="'请选择支付状态'"
                  [nzShowSearch]="true"
                  [(ngModel)]="i.payment_status"
                  required
                >
                  <nz-option *ngFor="let item of paymentStatusOptions" [nzValue]="item.value" [nzLabel]="item.label" />
                </nz-select>
              </nz-form-control>

              <nz-form-label nzSpan="4">发货状态</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择发货状态">
                <nz-select
                  name="delivery_status"
                  [nzPlaceHolder]="'请选择发货状态'"
                  [nzShowSearch]="true"
                  [(ngModel)]="i.delivery_status"
                  required
                >
                  <nz-option *ngFor="let item of deliveryStatusOptions" [nzValue]="item.value" [nzLabel]="item.label" />
                </nz-select>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">退换状态</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择退换状态">
                <nz-select
                  name="return_status"
                  [nzPlaceHolder]="'请选择退换状态'"
                  [nzShowSearch]="true"
                  [(ngModel)]="i.return_status"
                  required
                >
                  <nz-option *ngFor="let item of returnStatusOptions" [nzValue]="item.value" [nzLabel]="item.label" />
                </nz-select>
              </nz-form-control>

              <nz-form-label nzSpan="4">订单日期</nz-form-label>
              <nz-form-control nzSpan="8">
                <nz-date-picker name="order_date" [style]="{ width: '100%' }" [(ngModel)]="i.order_date" required />
              </nz-form-control>
            </nz-form-item>

            <!-- 其他订单售后字段 -->
            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">收款期数</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入收款期数">
                <nz-input-number name="payment_periods" placeholder="请输入收款期数" [(ngModel)]="i.payment_periods" required />
              </nz-form-control>

              <nz-form-label nzSpan="4">逾期罚金</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入逾期罚金">
                <nz-input-number name="overdue_fine" placeholder="请输入逾期罚金" [(ngModel)]="i.overdue_fine" required />
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">配送地址</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入配送地址">
                <textarea
                  nz-input
                  name="delivery_address"
                  placeholder="请输入配送地址"
                  [(ngModel)]="i.delivery_address"
                  required
                ></textarea>
              </nz-form-control>

              <nz-form-label nzSpan="4">退换原因</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入退换原因">
                <textarea nz-input name="return_reason" placeholder="请输入退换原因" [(ngModel)]="i.return_reason" required></textarea>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">联系人</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入联系人">
                <input nz-input name="contact_person" placeholder="请输入联系人" [(ngModel)]="i.contact_person" required />
              </nz-form-control>

              <nz-form-label nzSpan="4">联系人电话</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入联系人电话">
                <input nz-input name="contact_phone" placeholder="请输入联系人电话" [(ngModel)]="i.contact_phone" required />
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">电子邮箱</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入电子邮箱">
                <input nz-input name="email" placeholder="请输入电子邮箱" [(ngModel)]="i.email" required />
              </nz-form-control>

              <nz-form-label nzSpan="4">邮政编码</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入邮政编码">
                <input nz-input name="postal_code" placeholder="请输入邮政编码" [(ngModel)]="i.postal_code" required />
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">备注</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入备注">
                <textarea nz-input name="remarks" placeholder="请输入备注" [(ngModel)]="i.remarks" required></textarea>
              </nz-form-control>
            </nz-form-item>
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
export class OrderAfterSalesEditComponent implements OnInit {
  readonly msgSrv = inject(NzMessageService);
  private readonly modal = inject(NzModalRef);
  readonly http = inject(_HttpClient);
  readonly enumService = inject(EnumService);

  paymentStatusOptions = this.enumService.getEnumOptions('paymentStatus');
  deliveryStatusOptions = this.enumService.getEnumOptions('deliveryStatus');
  returnStatusOptions = this.enumService.getEnumOptions('returnStatus');

  customerList = [
    { id: 1, name: 'xx有限责任公司' },
    { id: 2, name: 'xx总局' },
    { id: 3, name: 'xx学校', hide: true }
  ];
  compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  i: any;

  ngOnInit(): void {
    if (this.i.id > 0) {
      this.http.get(`/sale005/order-after-sales/load/${this.i.id}`).subscribe(res => (this.i = res.list[0]));
    }
  }

  save(): void {
    this.http.post(`/sale005/order-after-sales/save/${this.i.id}`, this.i).subscribe(() => {
      this.msgSrv.success('保存成功');
      this.modal.destroy(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
