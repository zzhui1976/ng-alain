import { NgModule, Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-customer-family-edit',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="modal-header">
      <div class="modal-title">{{ i.id > 0 ? '编辑' : '添加' }}-家属</div>
    </div>

    <form #f="ngForm" (ngSubmit)="save()" nz-form>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">客户姓名</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.customerName" name="customerName" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">家属姓名</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.familyName" name="familyName" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">关系</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.relation" name="relation" required />
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
        <nz-form-label nzSpan="4">地址</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.address" name="address" required />
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
export class CustomerFamilyEditComponent implements OnInit {
  readonly msgSrv = inject(NzMessageService);
  private readonly modal = inject(NzModalRef);
  readonly http = inject(_HttpClient);

  i: any;

  ngOnInit(): void {
    if (this.i.id > 0) {
      this.http.get('/families').subscribe(res => (this.i = res.list[0]));
    }
  }

  save(): void {
    this.http.get('/families').subscribe(() => {
      this.msgSrv.success('保存成功');
      this.modal.destroy(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
