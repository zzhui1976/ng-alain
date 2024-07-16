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
      <div class="modal-title">{{ model.id > 0 ? '编辑' : '添加' }}-仓库</div>
    </div>

    <form #f="ngForm" (ngSubmit)="save()" nz-form [nzLayout]="'vertical'">
      <div class="scrollable-panel">
        <ng-container>
          <nz-card [nzBordered]="false" nzTitle="仓库管理">
            <nz-row nzGutter="16">
              <nz-col nzLg="6" nzMd="12" nzSm="24">
                <nz-form-item>
                  <nz-form-label nzFor="name">仓库名</nz-form-label>
                  <nz-form-control nzErrorTip="请输入仓库名称">
                    <input nz-input name="name" id="name" placeholder="请输入仓库名称" [(ngModel)]="model.name" required />
                  </nz-form-control>
                </nz-form-item>
              </nz-col>
              <nz-col [nzXl]="{ span: 6, offset: 2 }" [nzLg]="{ span: 8 }" [nzMd]="{ span: 12 }" nzSm="24">
                <nz-form-item>
                  <nz-form-label>仓库域名</nz-form-label>
                  <nz-form-control nzErrorTip="请输入仓库域名">
                    <nz-input-group nzAddOnBefore="http://" nzAddOnAfter=".com">
                      <input nz-input name="url" placeholder="请输入" [(ngModel)]="model.url" required />
                    </nz-input-group>
                  </nz-form-control>
                </nz-form-item>
              </nz-col>
              <nz-col [nzXl]="{ span: 8, offset: 2 }" [nzLg]="{ span: 10 }" [nzMd]="{ span: 24 }" nzSm="24">
                <nz-form-item>
                  <nz-form-label>仓库管理员</nz-form-label>
                  <nz-form-control nzErrorTip="请选择管理员">
                    <nz-select name="owner" [nzPlaceHolder]="'请选择管理员'" [nzShowSearch]="true" [(ngModel)]="model.owner" required>
                      <nz-option *ngFor="let i of users" [nzLabel]="i.label" [nzValue]="i.value" />
                    </nz-select>
                  </nz-form-control>
                </nz-form-item>
              </nz-col>
            </nz-row>
            <nz-row nzGutter="16">
              <nz-col nzLg="6" nzMd="12" nzSm="24">
                <nz-form-item>
                  <nz-form-label>审批员</nz-form-label>
                  <nz-form-control nzErrorTip="请选择审批员">
                    <nz-select name="approver" [nzPlaceHolder]="'请选择管理员'" [nzShowSearch]="true" [(ngModel)]="model.approver" required>
                      <nz-option *ngFor="let i of users" [nzLabel]="i.label" [nzValue]="i.value" />
                    </nz-select>
                  </nz-form-control>
                </nz-form-item>
              </nz-col>
              <nz-col [nzXl]="{ span: 6, offset: 2 }" [nzLg]="{ span: 8 }" [nzMd]="{ span: 12 }" nzSm="24">
                <nz-form-item>
                  <nz-form-label>生效日期</nz-form-label>
                  <nz-form-control>
                    <nz-range-picker name="date_range" [style]="{ width: '100%' }" [(ngModel)]="model.date_range" required />
                  </nz-form-control>
                </nz-form-item>
              </nz-col>
              <nz-col [nzXl]="{ span: 8, offset: 2 }" [nzLg]="{ span: 10 }" [nzMd]="{ span: 24 }" nzSm="24">
                <nz-form-item>
                  <nz-form-label>仓库类型</nz-form-label>
                  <nz-form-control nzErrorTip="请选择仓库类型">
                    <nz-select name="type" [nzShowSearch]="true" [nzPlaceHolder]="'请选择仓库类型'" [(ngModel)]="model.type" required>
                      <nz-option [nzLabel]="'私密'" [nzValue]="'private'" />
                      <nz-option [nzLabel]="'公开'" [nzValue]="'public'" />
                    </nz-select>
                  </nz-form-control>
                </nz-form-item>
              </nz-col>
            </nz-row>
          </nz-card>
          <nz-card [nzBordered]="false" nzTitle="任务管理">
            <nz-row nzGutter="16">
              <nz-col nzLg="6" nzMd="12" nzSm="24">
                <nz-form-item>
                  <nz-form-label>任务名</nz-form-label>
                  <nz-form-control nzErrorTip="请输入任务名">
                    <input nz-input name="name2" placeholder="请输入任务名" [(ngModel)]="model.name2" required />
                  </nz-form-control>
                </nz-form-item>
              </nz-col>
              <nz-col [nzXl]="{ span: 6, offset: 2 }" [nzLg]="{ span: 8 }" [nzMd]="{ span: 12 }" nzSm="24">
                <nz-form-item>
                  <nz-form-label>任务描述</nz-form-label>
                  <nz-form-control nzErrorTip="请输入任务描述">
                    <textarea
                      nz-input
                      name="summary"
                      [nzAutosize]="true"
                      placeholder="请输入任务描述"
                      [(ngModel)]="model.summary"
                      required
                    ></textarea>
                  </nz-form-control>
                </nz-form-item>
              </nz-col>
              <nz-col [nzXl]="{ span: 8, offset: 2 }" [nzLg]="{ span: 10 }" [nzMd]="{ span: 24 }" nzSm="24">
                <nz-form-item>
                  <nz-form-label>执行人</nz-form-label>
                  <nz-form-control nzErrorTip="请选择执行人">
                    <nz-select name="owner2" [nzPlaceHolder]="'请选择执行人'" [nzShowSearch]="true" [(ngModel)]="model.owner2" required>
                      <nz-option *ngFor="let i of users" [nzLabel]="i.label" [nzValue]="i.value" />
                    </nz-select>
                  </nz-form-control>
                </nz-form-item>
              </nz-col>
            </nz-row>
            <nz-row nzGutter="16">
              <nz-col nzLg="6" nzMd="12" nzSm="24">
                <nz-form-item>
                  <nz-form-label>责任人</nz-form-label>
                  <nz-form-control nzErrorTip="请选择责任人">
                    <nz-select
                      name="approver2"
                      [nzPlaceHolder]="'请选择责任人'"
                      [nzShowSearch]="true"
                      [(ngModel)]="model.approver2"
                      required
                    >
                      <nz-option *ngFor="let i of users" [nzLabel]="i.label" [nzValue]="i.value" />
                    </nz-select>
                  </nz-form-control>
                </nz-form-item>
              </nz-col>
              <nz-col [nzXl]="{ span: 6, offset: 2 }" [nzLg]="{ span: 8 }" [nzMd]="{ span: 12 }" nzSm="24">
                <nz-form-item>
                  <nz-form-label>生效时间</nz-form-label>
                  <nz-form-control>
                    <nz-time-picker name="time" [(ngModel)]="model.time" required />
                  </nz-form-control>
                </nz-form-item>
              </nz-col>
              <nz-col [nzXl]="{ span: 8, offset: 2 }" [nzLg]="{ span: 10 }" [nzMd]="{ span: 24 }" nzSm="24">
                <nz-form-item>
                  <nz-form-label>任务类型</nz-form-label>
                  <nz-form-control nzErrorTip="请选择任务类型">
                    <nz-select name="type2" [nzShowSearch]="true" [nzPlaceHolder]="'请选择任务类型'" [(ngModel)]="model.type2" required>
                      <nz-option [nzLabel]="'私密'" [nzValue]="'private'" />
                      <nz-option [nzLabel]="'公开'" [nzValue]="'public'" />
                    </nz-select>
                  </nz-form-control>
                </nz-form-item>
              </nz-col>
            </nz-row>
          </nz-card>
          <nz-card [nzBordered]="false" nzTitle="成员管理">
            <app-member-edit #t [items]="model.items" (itemsChange)="model.items = $event" />
            <button *ngIf="t.editIndex === -1" nz-button [nzType]="'dashed'" (click)="t.add()" nzBlock class="mt-md">
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

  model: any;
  users: any[] = [
    { value: 'xiao', label: '付晓晓' },
    { value: 'mao', label: '周毛毛' }
  ];

  ngOnInit(): void {
    if (this.model.id > 0) {
      this.http.get('/warehouses').subscribe(res => (this.model = res.list.filter((x: any) => x.id === this.model.id)[0]));
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
