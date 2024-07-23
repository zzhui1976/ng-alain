import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '@shared';

interface Product {
  key: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-sale001-order-product-edit',
  standalone: true,
  imports: [SharedModule],
  template: `
    <nz-table [nzData]="items" [nzShowPagination]="false">
      <thead>
        <tr>
          <th>商品编号</th>
          <th>商品名称</th>
          <th>数量</th>
          <th>单价</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of items; let i = index">
          <td>
            <span *ngIf="!editObjs.has(item)">{{ item.product_id }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请输入商品编号">
                <input nz-input [(ngModel)]="items[i]!.product_id" placeholder="请输入商品编号" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="!editObjs.has(item)">{{ item.product_name }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请输入商品名称">
                <input nz-input [(ngModel)]="items[i]!.product_name" placeholder="请输入商品名称" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="!editObjs.has(item)">{{ item.quantity }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请输入数量">
                <nz-input-number [(ngModel)]="items[i]!.quantity" placeholder="请输入数量" />
              </nz-form-control>
            </nz-form-item>
          </td>
          <td>
            <span *ngIf="!editObjs.has(item)">{{ item.price }}</span>
            <nz-form-item *ngIf="editObjs.has(item)">
              <nz-form-control nzErrorTip="请输入单价">
                <nz-input-number [(ngModel)]="items[i]!.price" placeholder="请输入单价" />
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
export class OrderProductEditComponent {
  @Input() items: Product[] = [];
  @Output() readonly itemsChange = new EventEmitter<Product[]>();

  editObjs = new Map();
  newObjs = new Map();

  add(): void {
    let newObj = { key: '', product_id: '', product_name: '', quantity: 0, price: 0 };
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
