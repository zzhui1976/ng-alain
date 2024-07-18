import { NgModule, Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { MemberEditComponent } from './member-edit.component';

@Component({
  selector: 'app-sale-warehouse-edit',
  standalone: true,
  imports: [SharedModule, MemberEditComponent],
  template: `
    <div class="modal-header">
      <div class="modal-title">{{ i.id > 0 ? '编辑' : '添加' }}-仓库</div>
    </div>

    <form #f="ngForm" (ngSubmit)="save()" nz-form>
      <div class="scrollable-panel">
        <ng-container>
          <nz-card [nzBordered]="false" nzTitle="仓库管理">
            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4" nzFor="name">仓库名</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入仓库名称">
                <input nz-input name="name" id="name" placeholder="请输入仓库名称" [(ngModel)]="i.name" required />
              </nz-form-control>

              <nz-form-label nzSpan="4">仓库域名</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入仓库域名">
                <nz-input-group nzAddOnBefore="http://" nzAddOnAfter=".com">
                  <input nz-input name="url" placeholder="请输入" [(ngModel)]="i.url" required />
                </nz-input-group>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">仓库管理员</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择管理员">
                <nz-select name="owner" [nzPlaceHolder]="'请选择管理员'" [nzShowSearch]="true" [(ngModel)]="i.owner" required>
                  <nz-option *ngFor="let i of users" [nzLabel]="i.label" [nzValue]="i.value" />
                </nz-select>
              </nz-form-control>

              <nz-form-label nzSpan="4">审批员</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择审批员">
                <nz-select name="approver" [nzPlaceHolder]="'请选择管理员'" [nzShowSearch]="true" [(ngModel)]="i.approver" required>
                  <nz-option *ngFor="let i of users" [nzLabel]="i.label" [nzValue]="i.value" />
                </nz-select>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">生效日期</nz-form-label>
              <nz-form-control nzSpan="8">
                <nz-range-picker name="date_range" [style]="{ width: '100%' }" [(ngModel)]="i.date_range" required />
              </nz-form-control>

              <nz-form-label nzSpan="4">仓库类型</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择仓库类型">
                <nz-select name="type" [nzShowSearch]="true" [nzPlaceHolder]="'请选择仓库类型'" [(ngModel)]="i.type" required>
                  <nz-option [nzLabel]="'私密'" [nzValue]="'private'" />
                  <nz-option [nzLabel]="'公开'" [nzValue]="'public'" />
                </nz-select>
              </nz-form-control>
            </nz-form-item>
          </nz-card>
          <nz-card [nzBordered]="false" nzTitle="任务管理">
            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">任务名</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入任务名">
                <input nz-input name="name2" placeholder="请输入任务名" [(ngModel)]="i.name2" required />
              </nz-form-control>

              <nz-form-label nzSpan="4">任务描述</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请输入任务描述">
                <textarea
                  nz-input
                  name="summary"
                  [nzAutosize]="true"
                  placeholder="请输入任务描述"
                  [(ngModel)]="i.summary"
                  required
                ></textarea>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">执行人</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择执行人">
                <nz-select name="owner2" [nzPlaceHolder]="'请选择执行人'" [nzShowSearch]="true" [(ngModel)]="i.owner2" required>
                  <nz-option *ngFor="let i of users" [nzLabel]="i.label" [nzValue]="i.value" />
                </nz-select>
              </nz-form-control>

              <nz-form-label nzSpan="4">责任人</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择责任人">
                <nz-select name="approver2" [nzPlaceHolder]="'请选择责任人'" [nzShowSearch]="true" [(ngModel)]="i.approver2" required>
                  <nz-option *ngFor="let i of users" [nzLabel]="i.label" [nzValue]="i.value" />
                </nz-select>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item class="mb-sm">
              <nz-form-label nzSpan="4">生效时间</nz-form-label>
              <nz-form-control nzSpan="8">
                <nz-time-picker name="time" [(ngModel)]="i.time" required />
              </nz-form-control>

              <nz-form-label nzSpan="4">任务类型</nz-form-label>
              <nz-form-control nzSpan="8" nzErrorTip="请选择任务类型">
                <nz-select name="type2" [nzShowSearch]="true" [nzPlaceHolder]="'请选择任务类型'" [(ngModel)]="i.type2" required>
                  <nz-option [nzLabel]="'私密'" [nzValue]="'private'" />
                  <nz-option [nzLabel]="'公开'" [nzValue]="'public'" />
                </nz-select>
              </nz-form-control>
            </nz-form-item>
          </nz-card>
          <nz-card [nzBordered]="false" nzTitle="成员管理">
            <app-member-edit #t [items]="i.items" (itemsChange)="i.items = $event" />
            <button nz-button type="button" [nzType]="'dashed'" (click)="t.add()" nzBlock class="mt-md">
              <i nz-icon nzType="plus"></i>
              <span>新增成员</span>
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
export class SaleWarehouseEditComponent implements OnInit {
  readonly msgSrv = inject(NzMessageService);
  private readonly modal = inject(NzModalRef);
  readonly http = inject(_HttpClient);

  i: any;
  users: any[] = [
    { value: 'xiao', label: '付晓晓' },
    { value: 'mao', label: '周毛毛' }
  ];

  ngOnInit(): void {
    if (this.i.id > 0) {
      this.http.get('/warehouses').subscribe(res => (this.i = res.list.filter((x: any) => x.id === this.i.id)[0]));
    }
  }

  save(): void {
    this.http.get('/warehouses').subscribe(() => {
      this.msgSrv.success('保存成功');
      this.modal.destroy(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
