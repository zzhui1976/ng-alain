import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '@shared';

interface Payment {
  key: string;
  payment_id: string;
  payment_date: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-payment-edit',
  standalone: true,
  imports: [SharedModule],
  template: `
    <nz-table [nzData]="items" [nzShowPagination]="false">
      <thead>
        <tr>
          <th>付款编号</th>
          <th>付款日期</th>
          <th>金额</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of items; let i = index">
          <td>
            <span *ngIf="!editObjs.has(item)">{{ item.payment_id }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请输入付款编号">
                <input nz-input [(ngModel)]="items[i]!.payment_id" placeholder="请输入付款编号" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="!editObjs.has(item)">{{ item.payment_date }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请输入付款日期">
                <nz-date-picker [(ngModel)]="items[i]!.payment_date" placeholder="请输入付款日期" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="!editObjs.has(item)">{{ item.amount }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请输入金额">
                <nz-input-number [(ngModel)]="items[i]!.amount" placeholder="请输入金额" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="!editObjs.has(item)">{{ item.status }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请选择状态">
                <nz-select [(ngModel)]="items[i]!.status" placeholder="请选择状态">
                  <nz-option nzValue="Pending" nzLabel="待支付" />
                  <nz-option nzValue="Paid" nzLabel="已支付" />
                  <nz-option nzValue="Cancelled" nzLabel="已取消" />
                </nz-select>
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
export class PaymentEditComponent {
  @Input() items: Payment[] = [];
  @Output() readonly itemsChange = new EventEmitter<Payment[]>();

  editObjs = new Map();
  newObjs = new Map();

  add(): void {
    let newObj = { key: '', payment_id: '', payment_date: '', amount: 0, status: 'Pending' };
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
