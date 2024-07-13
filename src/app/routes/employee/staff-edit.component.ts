import { NgModule, Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SharedModule } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-employee-staff-edit',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="modal-header">
      <div class="modal-title">{{ i.id > 0 ? '编辑' : '添加' }}-雇员</div>
    </div>

    <form #f="ngForm" (ngSubmit)="save()" nz-form>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">法人</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.corporation" name="corporation" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">雇员姓名</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.name" name="name" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">部门</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.department" name="department" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">职级</nz-form-label>
        <nz-form-control nzSpan="8">
          <input nz-input [(ngModel)]="i.rank" name="rank" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">入职时间</nz-form-label>
        <nz-form-control nzSpan="8">
          <nz-date-picker [(ngModel)]="i.join_date" name="join_date" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="mb-sm">
        <nz-form-label nzSpan="4">履历</nz-form-label>
        <nz-form-control nzSpan="16">
          <nz-table #resumeTable nzBordered [nzData]="i.resume" nzSize="small">
            <thead>
              <tr>
                <th>时间</th>
                <th>事件</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of resumeTable.data">
                <td>{{ item.time }}</td>
                <td>{{ item.event }}</td>
                <td>{{ item.note }}</td>
              </tr>
            </tbody>
          </nz-table>
        </nz-form-control>
      </nz-form-item>
      <div class="modal-footer">
        <button nz-button type="button" (click)="close()">关闭</button>
        <button nz-button [disabled]="!f.form.valid || !f.form.dirty" [nzLoading]="http.loading" [nzType]="'primary'"> 保存 </button>
      </div>
    </form>
  `
})
export class EmployeeStaffEditComponent implements OnInit {
  readonly msgSrv = inject(NzMessageService);
  private readonly modal = inject(NzModalRef);
  readonly http = inject(_HttpClient);

  i: any;

  ngOnInit(): void {
    if (this.i.id > 0) {
      this.http.get('/staffs').subscribe(res => (this.i = res.list[0]));
    }
  }

  save(): void {
    this.http.get('/staffs').subscribe(() => {
      this.msgSrv.success('保存成功');
      this.modal.destroy(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
