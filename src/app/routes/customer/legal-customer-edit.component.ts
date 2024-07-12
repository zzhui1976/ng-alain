import { NgModule, Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-legal-customer-edit',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="modal-header">
      <div class="modal-title">{{ i.id > 0 ? '编辑' : '添加' }}-法人客户</div>
    </div>

    <form #f="ngForm" (ngSubmit)="save()" nz-form>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">公司名称</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.name" name="name" maxlength="100" required />
        </nz-form-control>
        <nz-form-label nzSpan="4">税号</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.tax_id" name="tax_id" maxlength="20" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">注册地址</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.register_address" name="register_address" maxlength="200" required />
        </nz-form-control>
        <nz-form-label nzSpan="4">办公地址</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.office_address" name="office_address" maxlength="200" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">法人代表</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.legal_representative" name="legal_representative" maxlength="50" required />
        </nz-form-control>
        <nz-form-label nzSpan="4">注册资本</nz-form-label>
        <nz-form-control nzSpan="8">
          <nz-input-number [(ngModel)]="i.registered_capital" name="registered_capital" [nzMin]="0" [nzStep]="1000" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">成立日期</nz-form-label>
        <nz-form-control nzSpan="8">
          <nz-date-picker [(ngModel)]="i.establishment_date" name="establishment_date" required />
        </nz-form-control>
        <nz-form-label nzSpan="4">经营范围</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.business_scope" name="business_scope" maxlength="500" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">联系电话</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.contact_phone" name="contact_phone" maxlength="20" required />
        </nz-form-control>
        <nz-form-label nzSpan="4">邮箱</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.email" name="email" maxlength="100" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">行业类型</nz-form-label>
        <nz-form-control nzSpan="8">
          <nz-select [(ngModel)]="i.industry_type" name="industry_type" required [nzAllowClear]="false">
            <nz-option nzValue="technology" nzLabel="科技" />
            <nz-option nzValue="manufacturing" nzLabel="制造业" />
            <nz-option nzValue="finance" nzLabel="金融" />
            <nz-option nzValue="education" nzLabel="教育" />
          </nz-select>
        </nz-form-control>
        <nz-form-label nzSpan="4">客户来源</nz-form-label>
        <nz-form-control nzSpan="8">
          <nz-select [(ngModel)]="i.source" name="source" required [nzAllowClear]="false">
            <nz-option nzValue="online" nzLabel="线上" />
            <nz-option nzValue="offline" nzLabel="线下" />
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">备注</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.remark" name="remark" maxlength="500" placeholder="500字以内" />
        </nz-form-control>
      </nz-form-item>
      <div class="modal-footer">
        <button nz-button type="button" (click)="close()">关闭</button>
        <button nz-button [disabled]="!f.form.valid || !f.form.dirty" [nzLoading]="http.loading" [nzType]="'primary'"> 保存 </button>
      </div>
    </form>
  `
})
export class LegalCustomerEditComponent implements OnInit {
  readonly msgSrv = inject(NzMessageService);
  private readonly modal = inject(NzModalRef);
  readonly http = inject(_HttpClient);

  i: any;

  ngOnInit(): void {
    if (this.i.id > 0) {
      this.http.get('/legal-customers').subscribe(res => (this.i = res.list[0]));
    }
  }

  save(): void {
    this.http.get('/legal-customers').subscribe(() => {
      this.msgSrv.success('保存成功，只是模拟，实际未变更');
      this.modal.destroy(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
