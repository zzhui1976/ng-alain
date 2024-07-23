import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '@shared';

interface Employee {
  key: string;
  employee_id: string;
  employee_name: string;
  position: string;
  phone: string;
}

@Component({
  selector: 'app-sale001-employee-edit',
  standalone: true,
  imports: [SharedModule],
  template: `
    <nz-table [nzData]="items" [nzShowPagination]="false">
      <thead>
        <tr>
          <th>雇员编号</th>
          <th>雇员姓名</th>
          <th>职位</th>
          <th>电话</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of items; let i = index">
          <td>
            <span *ngIf="!editObjs.has(item)">{{ item.employee_id }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请输入雇员编号">
                <input nz-input [(ngModel)]="items[i]!.employee_id" placeholder="请输入雇员编号" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="!editObjs.has(item)">{{ item.employee_name }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请输入雇员姓名">
                <input nz-input [(ngModel)]="items[i]!.employee_name" placeholder="请输入雇员姓名" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="!editObjs.has(item)">{{ item.position }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请输入职位">
                <input nz-input [(ngModel)]="items[i]!.position" placeholder="请输入职位" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="!editObjs.has(item)">{{ item.phone }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请输入电话">
                <input nz-input [(ngModel)]="items[i]!.phone" placeholder="请输入电话" />
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
export class EmployeeEditComponent {
  @Input() items: Employee[] = [];
  @Output() readonly itemsChange = new EventEmitter<Employee[]>();

  editObjs = new Map();
  newObjs = new Map();

  add(): void {
    let newObj = { key: '', employee_id: '', employee_name: '', position: '', phone: '' };
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
