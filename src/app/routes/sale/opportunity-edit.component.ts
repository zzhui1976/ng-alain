import { NgModule, Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-sale-opportunity-edit',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="modal-header">
      <div class="modal-title">{{ i.id > 0 ? '编辑' : '添加' }}-商机</div>
    </div>

    <form #f="ngForm" (ngSubmit)="save()" nz-form>
      <nz-row nzGutter="16">
        <nz-col nzSpan="12">
          <nz-form-item class="mb-sm">
            <nz-form-label nzSpan="8">商机名称</nz-form-label>
            <nz-form-control nzSpan="16">
              <input nz-input [(ngModel)]="i.name" name="name" required />
            </nz-form-control>
          </nz-form-item>
        </nz-col>
        <nz-col nzSpan="12">
          <nz-form-item class="mb-sm">
            <nz-form-label nzSpan="8">客户名称</nz-form-label>
            <nz-form-control nzSpan="16">
              <input nz-input [(ngModel)]="i.customer" name="customer" required />
            </nz-form-control>
          </nz-form-item>
        </nz-col>
      </nz-row>
      <nz-row nzGutter="16">
        <nz-col nzSpan="12">
          <nz-form-item class="mb-sm">
            <nz-form-label nzSpan="8">状态</nz-form-label>
            <nz-form-control nzSpan="16">
              <input nz-input [(ngModel)]="i.status" name="status" required />
            </nz-form-control>
          </nz-form-item>
        </nz-col>
        <nz-col nzSpan="12">
          <nz-form-item class="mb-sm">
            <nz-form-label nzSpan="8">预计金额</nz-form-label>
            <nz-form-control nzSpan="16">
              <nz-input-number [(ngModel)]="i.amount" name="amount" [nzMin]="0" required />
            </nz-form-control>
          </nz-form-item>
        </nz-col>
      </nz-row>
      <nz-row nzGutter="16">
        <nz-col nzSpan="12">
          <nz-form-item class="mb-sm">
            <nz-form-label nzSpan="8">预计成交日期</nz-form-label>
            <nz-form-control nzSpan="16">
              <nz-date-picker [(ngModel)]="i.expectedDate" name="expectedDate" required />
            </nz-form-control>
          </nz-form-item>
        </nz-col>
        <nz-col nzSpan="12">
          <nz-form-item class="mb-sm">
            <nz-form-label nzSpan="8">负责人</nz-form-label>
            <nz-form-control nzSpan="16">
              <input nz-input [(ngModel)]="i.owner" name="owner" required />
            </nz-form-control>
          </nz-form-item>
        </nz-col>
      </nz-row>
      <nz-row nzGutter="16">
        <nz-col nzSpan="12">
          <nz-form-item class="mb-sm">
            <nz-form-label nzSpan="8">创建日期</nz-form-label>
            <nz-form-control nzSpan="16">
              <nz-date-picker [(ngModel)]="i.createdDate" name="createdDate" required />
            </nz-form-control>
          </nz-form-item>
        </nz-col>
        <nz-col nzSpan="12">
          <nz-form-item class="mb-sm">
            <nz-form-label nzSpan="8">备注</nz-form-label>
            <nz-form-control nzSpan="16">
              <textarea nz-input [(ngModel)]="i.note" name="note" required></textarea>
            </nz-form-control>
          </nz-form-item>
        </nz-col>
      </nz-row>
      <div class="modal-footer">
        <button nz-button type="button" (click)="close()">关闭</button>
        <button nz-button [disabled]="!f.form.valid || !f.form.dirty" [nzLoading]="http.loading" [nzType]="'primary'"> 保存 </button>
      </div>
    </form>
  `
})
export class SaleOpportunityEditComponent implements OnInit {
  readonly msgSrv = inject(NzMessageService);
  private readonly modal = inject(NzModalRef);
  readonly http = inject(_HttpClient);

  i: any;

  ngOnInit(): void {
    if (this.i.id > 0) {
      this.http.get('/opportunities').subscribe(res => (this.i = res.list.filter((x: any) => x.id === this.i.id)[0]));
    }
  }

  save(): void {
    this.http.get('/opportunities').subscribe(() => {
      this.msgSrv.success('保存成功');
      this.modal.destroy(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
