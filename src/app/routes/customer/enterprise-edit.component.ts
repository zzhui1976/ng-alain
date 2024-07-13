import { NgModule, Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-customer-enterprise-edit',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="modal-header">
      <div class="modal-title">{{ i.id > 0 ? '编辑' : '添加' }}-企业</div>
    </div>

    <form #f="ngForm" (ngSubmit)="save()" nz-form>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">企业名称</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.name" name="name" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">行业</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.industry" name="industry" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">地址</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.address" name="address" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">联系电话</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.phone" name="phone" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">邮箱</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.email" name="email" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">法人代表</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.legalRepresentative" name="legalRepresentative" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">注册资本</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.registeredCapital" name="registeredCapital" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">成立日期</nz-form-label>
        <nz-form-control nzSpan="8">
          <nz-date-picker [(ngModel)]="i.establishmentDate" name="establishmentDate" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">经营范围</nz-form-label>
        <nz-form-control nzSpan="8">
          <textarea nz-input [(ngModel)]="i.businessScope" name="businessScope" required></textarea>
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
export class CustomerEnterpriseEditComponent implements OnInit {
  readonly msgSrv = inject(NzMessageService);
  private readonly modal = inject(NzModalRef);
  readonly http = inject(_HttpClient);

  i: any;

  ngOnInit(): void {
    if (this.i.id > 0) {
      this.http.get('/enterprises').subscribe(res => (this.i = res.list[0]));
    }
  }

  save(): void {
    this.http.get('/enterprises').subscribe(() => {
      this.msgSrv.success('保存成功');
      this.modal.destroy(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
