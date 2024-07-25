import { NgModule, Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { EnumService } from './enum.service';
import { OrderPaymentEditComponent } from './order-payment-edit.component';
import { OrderProductEditComponent } from './order-product-edit.component';

@Component({
  selector: 'app-sale003-corporate-customer-order-edit',
  standalone: true,
  imports: [SharedModule, OrderProductEditComponent, OrderPaymentEditComponent],
  template: `
    <div class="modal-header">
      <div class="modal-title">{{ i.id > 0 ? '编辑' : '添加' }}-法人客户订单</div>
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
              <nz-form-label nzSpan="4">订单状态</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择订单状态">
                <nz-select name="status" [nzPlaceHolder]="'请选择订单状态'" [nzShowSearch]="true" [(ngModel)]="i.status" required>
                  <nz-option *ngFor="let item of orderStatusOptions" [nzValue]="item.value" [nzLabel]="item.label" />
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

            <!-- 其他法人团体字段 -->
            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">法人代表</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入法人代表">
                <input nz-input name="legal_representative" placeholder="请输入法人代表" [(ngModel)]="i.legal_representative" required />
              </nz-form-control>

              <nz-form-label nzSpan="4">注册资本</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入注册资本">
                <nz-input-number name="registered_capital" placeholder="请输入注册资本" [(ngModel)]="i.registered_capital" required />
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">成立日期</nz-form-label>
              <nz-form-control nzSpan="8">
                <nz-date-picker name="establishment_date" [style]="{ width: '100%' }" [(ngModel)]="i.establishment_date" required />
              </nz-form-control>

              <nz-form-label nzSpan="4">经营范围</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入经营范围">
                <textarea nz-input name="business_scope" placeholder="请输入经营范围" [(ngModel)]="i.business_scope" required></textarea>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">税务登记号</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入税务登记号">
                <input
                  nz-input
                  name="tax_registration_number"
                  placeholder="请输入税务登记号"
                  [(ngModel)]="i.tax_registration_number"
                  required
                />
              </nz-form-control>

              <nz-form-label nzSpan="4">组织机构代码</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入组织机构代码">
                <input nz-input name="organization_code" placeholder="请输入组织机构代码" [(ngModel)]="i.organization_code" required />
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">营业执照号</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入营业执照号">
                <input
                  nz-input
                  name="business_license_number"
                  placeholder="请输入营业执照号"
                  [(ngModel)]="i.business_license_number"
                  required
                />
              </nz-form-control>

              <nz-form-label nzSpan="4">开户银行</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入开户银行">
                <input nz-input name="bank_name" placeholder="请输入开户银行" [(ngModel)]="i.bank_name" required />
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">银行账号</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入银行账号">
                <input nz-input name="bank_account" placeholder="请输入银行账号" [(ngModel)]="i.bank_account" required />
              </nz-form-control>

              <nz-form-label nzSpan="4">联系人</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入联系人">
                <input nz-input name="contact_person" placeholder="请输入联系人" [(ngModel)]="i.contact_person" required />
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">联系人电话</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入联系人电话">
                <input nz-input name="contact_phone" placeholder="请输入联系人电话" [(ngModel)]="i.contact_phone" required />
              </nz-form-control>

              <nz-form-label nzSpan="4">电子邮箱</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入电子邮箱">
                <input nz-input name="email" placeholder="请输入电子邮箱" [(ngModel)]="i.email" required />
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">邮政编码</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入邮政编码">
                <input nz-input name="postal_code" placeholder="请输入邮政编码" [(ngModel)]="i.postal_code" required />
              </nz-form-control>

              <nz-form-label nzSpan="4">备注</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入备注">
                <textarea nz-input name="remarks" placeholder="请输入备注" [(ngModel)]="i.remarks" required></textarea>
              </nz-form-control>
            </nz-form-item>
          </nz-card>
          <nz-card [nzBordered]="false" nzTitle="商品信息">
            <app-sale003-order-product-edit #t [items]="i.items" (itemsChange)="i.items = $event" />
            <button nz-button type="button" [nzType]="'dashed'" (click)="t.add()" nzBlock class="mt-md">
              <i nz-icon nzType="plus"></i>
              <span>新增商品</span>
            </button>
          </nz-card>
          <nz-card [nzBordered]="false" nzTitle="付款信息">
            <app-sale003-order-payment-edit #p [items]="i.payments" (itemsChange)="i.payments = $event" />
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
export class CorporateCustomerOrderEditComponent implements OnInit {
  readonly msgSrv = inject(NzMessageService);
  private readonly modal = inject(NzModalRef);
  readonly http = inject(_HttpClient);
  readonly enumService = inject(EnumService);

  orderStatusOptions = this.enumService.getEnumOptions('orderStatus');

  customerList = [
    { id: 1, name: 'xx有限责任公司' },
    { id: 2, name: 'xx总局' },
    { id: 3, name: 'xx学校', hide: true }
  ];
  compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  i: any;

  ngOnInit(): void {
    if (this.i.id > 0) {
      this.http.get(`/sale003/corporate-customer-order/load/${this.i.id}`).subscribe(res => (this.i = res.list[0]));
    }
  }

  save(): void {
    this.http.post(`/sale003/corporate-customer-order/save/${this.i.id}`, this.i).subscribe(() => {
      this.msgSrv.success('保存成功');
      this.modal.destroy(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
