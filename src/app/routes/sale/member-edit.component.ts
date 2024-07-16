import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '@shared';

interface User {
  key: string;
  workId: string;
  name: string;
  department: string;
}

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [SharedModule],
  template: `
    <nz-table [nzData]="items" [nzShowPagination]="false">
      <thead>
        <tr>
          <th>成员姓名</th>
          <th>工号</th>
          <th>所属部门</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of items; let i = index">
          <td>
            <span *ngIf="editIndex !== i">{{ item.name }}</span>
            <nz-form-item *ngIf="editIndex === i">
              <nz-form-control nzErrorTip="请输入成员姓名">
                <input nz-input [(ngModel)]="editObj!.name" placeholder="请输入成员姓名" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="editIndex !== i">{{ item.workId }}</span>
            <nz-form-item *ngIf="editIndex === i">
              <nz-form-control nzErrorTip="请输入工号">
                <input nz-input [(ngModel)]="editObj!.workId" placeholder="请输入工号" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="editIndex !== i">{{ item.department }}</span>
            <nz-form-item *ngIf="editIndex === i">
              <nz-form-control nzErrorTip="请输入所属部门">
                <input nz-input [(ngModel)]="editObj!.department" placeholder="请输入所属部门" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="editIndex !== i">
              <a (click)="edit(i)">编辑</a>
              <nz-divider nzType="vertical" />
              <a nz-popconfirm nzPopconfirmTitle="是否要删除此行？" (nzOnConfirm)="del(i)">删除</a>
            </span>
            <span *ngIf="editIndex === i">
              <a (click)="save(i)">保存</a>
              <nz-divider nzType="vertical" />
              <a nz-popconfirm nzPopconfirmTitle="是否要取消操作？" (nzOnConfirm)="cancel(i)">取消</a>
            </span>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class MemberEditComponent {
  @Input() items: User[] = [];
  @Output() readonly itemsChange = new EventEmitter<User[]>();

  editIndex = -1;
  editObj: User | null = null;

  add(): void {
    this.items.push({ key: '', workId: '', name: '', department: '' });
    this.edit(this.items.length - 1);
  }

  del(index: number): void {
    this.items.splice(index, 1);
    this.itemsChange.emit(this.items);
  }

  edit(index: number): void {
    this.editObj = { ...this.items[index] };
    this.editIndex = index;
  }

  save(index: number): void {
    this.items[index] = { ...this.editObj! };
    this.editIndex = -1;
    this.itemsChange.emit(this.items);
  }

  cancel(index: number): void {
    if (!this.items[index].key) {
      this.del(index);
    }
    this.editIndex = -1;
  }
}
