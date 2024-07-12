import { NgModule, Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="modal-header">
      <div class="modal-title">{{ i.id > 0 ? '编辑' : '添加' }}-个人客户</div>
    </div>

    <form #f="ngForm" (ngSubmit)="save()" nz-form>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">姓名</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.name" name="name" maxlength="30" required />
        </nz-form-control>
        <nz-form-label nzSpan="4">电话</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.phone" name="phone" maxlength="20" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">邮箱</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.email" name="email" maxlength="50" required />
        </nz-form-control>
        <nz-form-label nzSpan="4">地址</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.address" name="address" maxlength="100" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">性别</nz-form-label>
        <nz-form-control nzSpan="8">
          <nz-select [(ngModel)]="i.gender" name="gender" required [nzAllowClear]="false">
            <nz-option nzValue="male" nzLabel="男" />
            <nz-option nzValue="female" nzLabel="女" />
          </nz-select>
        </nz-form-control>
        <nz-form-label nzSpan="4">出生日期</nz-form-label>
        <nz-form-control nzSpan="8">
          <nz-date-picker [(ngModel)]="i.birthday" name="birthday" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">身份证号</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.id_card" name="id_card" maxlength="18" required />
        </nz-form-control>
        <nz-form-label nzSpan="4">职业</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.occupation" name="occupation" maxlength="30" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">教育程度</nz-form-label>
        <nz-form-control nzSpan="8">
          <nz-select [(ngModel)]="i.education" name="education" required [nzAllowClear]="false">
            <nz-option nzValue="high_school" nzLabel="高中" />
            <nz-option nzValue="bachelor" nzLabel="本科" />
            <nz-option nzValue="master" nzLabel="硕士" />
            <nz-option nzValue="doctor" nzLabel="博士" />
          </nz-select>
        </nz-form-control>
        <nz-form-label nzSpan="4">婚姻状况</nz-form-label>
        <nz-form-control nzSpan="8">
          <nz-select [(ngModel)]="i.marital_status" name="marital_status" required [nzAllowClear]="false">
            <nz-option nzValue="single" nzLabel="未婚" />
            <nz-option nzValue="married" nzLabel="已婚" />
            <nz-option nzValue="divorced" nzLabel="离异" />
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">收入水平</nz-form-label>
        <nz-form-control nzSpan="8">
          <nz-input-number [(ngModel)]="i.income_level" name="income_level" [nzMin]="0" [nzStep]="1000" />
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
          <input nz-input [(ngModel)]="i.remark" name="remark" maxlength="200" placeholder="200字以内" />
        </nz-form-control>
      </nz-form-item>
      <div class="modal-footer">
        <button nz-button type="button" (click)="close()">关闭</button>
        <button nz-button [disabled]="!f.form.valid || !f.form.dirty" [nzLoading]="http.loading" [nzType]="'primary'"> 保存 </button>
      </div>
    </form>
  `
})
export class CustomerEditComponent implements OnInit {
  readonly msgSrv = inject(NzMessageService);
  private readonly modal = inject(NzModalRef);
  readonly http = inject(_HttpClient);

  i: any;

  ngOnInit(): void {
    if (this.i.id > 0) {
      this.http.get('/customers').subscribe(res => (this.i = res.list[0]));
    }
  }

  save(): void {
    this.http.get('/customers').subscribe(() => {
      this.msgSrv.success('保存成功，只是模拟，实际未变更');
      this.modal.destroy(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
