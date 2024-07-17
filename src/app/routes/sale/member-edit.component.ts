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
            <span *ngIf="!editObjs.has(item)">{{ item.name }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请输入成员姓名">
                <input nz-input [(ngModel)]="items[i]!.name" placeholder="请输入成员姓名" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="!editObjs.has(item)">{{ item.workId }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请输入工号">
                <nz-input-number [(ngModel)]="items[i]!.workId" placeholder="请输入工号" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="!editObjs.has(item)">{{ item.department }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请输入所属部门">
                <input nz-input [(ngModel)]="items[i]!.department" placeholder="请输入所属部门" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="!editObjs.has(item)">
              <a (click)="edit(i)">编辑</a>
              <nz-divider nzType="vertical" />
              <a nz-popconfirm nzPopconfirmTitle="是否要删除此行？" (nzOnConfirm)="del(i)">删除</a>
            </span>
            <span *ngIf="editObjs.has(item)">
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

  //editIndex = -1;
  editObjs = new Map();
  newObjs = new Map();

  add(): void {
    let newObj = { key: '', workId: '', name: '', department: '' };
    this.items.push(newObj);
    this.edit(this.items.length - 1);
    this.newObjs.set(newObj, newObj);
  }

  del(index: number): void {
    this.items.splice(index, 1);
    this.itemsChange.emit(this.items);
  }

  edit(index: number): void {
    this.editObjs.set(this.items[index], { ...this.items[index] });
  }

  save(index: number): void {
    this.editObjs.delete(this.items[index]);
    this.itemsChange.emit(this.items);
  }

  cancel(index: number): void {
    let oldobj = this.editObjs.get(this.items[index]);
    this.editObjs.delete(this.items[index]);
    if (this.newObjs.has(this.items[index])) {
      this.newObjs.delete(this.items[index]);
      this.items.splice(index, 1);
    } else {
      this.items[index] = oldobj;
    }
  }
}
