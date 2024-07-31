import { NgModule, Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { EnumService } from './enum.service';

@Component({
  selector: 'app-cust001-customer-visit-edit',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="modal-header">
      <div class="modal-title">{{ i.id > 0 ? '编辑' : '添加' }}-客户拜访记录管理</div>
    </div>

    <form #f="ngForm" (ngSubmit)="save()" nz-form>
      <div class="scrollable-panel">
        <ng-container>
          <nz-card [nzBordered]="false" nzTitle="拜访信息">
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

              <nz-form-label nzSpan="4">拜访日期</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择拜访日期">
                <nz-date-picker name="visit_date" [style]="{ width: '100%' }" [(ngModel)]="i.visit_date" required />
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">拜访状态</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择拜访状态">
                <nz-select
                  name="visit_status"
                  [nzPlaceHolder]="'请选择拜访状态'"
                  [nzShowSearch]="true"
                  [(ngModel)]="i.visit_status"
                  required
                >
                  <nz-option *ngFor="let item of visitStatusOptions" [nzValue]="item.value" [nzLabel]="item.label" />
                </nz-select>
              </nz-form-control>

              <nz-form-label nzSpan="4">客户类型</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择客户类型">
                <nz-select
                  name="customer_type"
                  [nzPlaceHolder]="'请选择客户类型'"
                  [nzShowSearch]="true"
                  [(ngModel)]="i.customer_type"
                  required
                >
                  <nz-option *ngFor="let item of customerTypeOptions" [nzValue]="item.value" [nzLabel]="item.label" />
                </nz-select>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">拜访结果</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择拜访结果">
                <nz-select
                  name="visit_result"
                  [nzPlaceHolder]="'请选择拜访结果'"
                  [nzShowSearch]="true"
                  [(ngModel)]="i.visit_result"
                  required
                >
                  <nz-option *ngFor="let item of visitResultOptions" [nzValue]="item.value" [nzLabel]="item.label" />
                </nz-select>
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
              <nz-form-label nzSpan="4">拜访目的</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入拜访目的">
                <textarea nz-input name="visit_purpose" placeholder="请输入拜访目的" [(ngModel)]="i.visit_purpose" required></textarea>
              </nz-form-control>

              <nz-form-label nzSpan="4">拜访备注</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入拜访备注">
                <textarea nz-input name="visit_remarks" placeholder="请输入拜访备注" [(ngModel)]="i.visit_remarks" required></textarea>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">拜访地点</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入拜访地点">
                <input nz-input name="visit_location" placeholder="请输入拜访地点" [(ngModel)]="i.visit_location" required />
              </nz-form-control>

              <nz-form-label nzSpan="4">拜访人员</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入拜访人员">
                <input nz-input name="visit_staff" placeholder="请输入拜访人员" [(ngModel)]="i.visit_staff" required />
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">后续行动</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入后续行动">
                <textarea
                  nz-input
                  name="follow_up_actions"
                  placeholder="请输入后续行动"
                  [(ngModel)]="i.follow_up_actions"
                  required
                ></textarea>
              </nz-form-control>

              <nz-form-label nzSpan="4">附件</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请上传附件">
                <nz-upload nzAction="/upload.do" [(nzFileList)]="i.attachments">
                  <button nz-button>
                    <i nz-icon nzType="upload"></i>
                    上传
                  </button>
                </nz-upload>
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
export class CustomerVisitEditComponent implements OnInit {
  readonly msgSrv = inject(NzMessageService);
  private readonly modal = inject(NzModalRef);
  readonly http = inject(_HttpClient);
  readonly enumService = inject(EnumService);

  visitStatusOptions = this.enumService.getEnumOptions('visitStatus');
  customerTypeOptions = this.enumService.getEnumOptions('customerType');
  visitResultOptions = this.enumService.getEnumOptions('visitResult');

  customerList = [
    { id: 1, name: 'xx有限责任公司' },
    { id: 2, name: 'xx总局' },
    { id: 3, name: 'xx学校', hide: true }
  ];
  compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  i: any;

  ngOnInit(): void {
    if (this.i.id > 0) {
      this.http.get(`/cust001/customer-visit/load/${this.i.id}`).subscribe(res => (this.i = res.list[0]));
    }
  }

  save(): void {
    this.http.post(`/cust001/customer-visit/save/${this.i.id}`, this.i).subscribe(() => {
      this.msgSrv.success('保存成功');
      this.modal.destroy(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
