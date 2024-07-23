import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  constructor() {}

  // 枚举对象
  private enums: { [key: string]: { [key: string]: string } } = {
    orderStatus: {
      '1': '待支付',
      '2': '已支付',
      '3': '已取消',
      '4': '已完成'
    },
    productTypes: {
      '1': '电子产品',
      '2': '家居用品',
      '3': '服装'
    }
  };

  // 获取枚举
  getEnum(enumType: string): { [key: string]: string } {
    return this.enums[enumType];
  }

  // 获取枚举的显示值
  getEnumLabel(enumType: string, value: string): string {
    const enums = this.enums[enumType];
    return enums[value] || '';
  }

  // 获取所有枚举选项
  getEnumOptions(enumType: string): Array<{ value: string; label: string }> {
    const enums = this.enums[enumType];
    return enums ? this.getOptions(enums) : [];
  }

  // 将枚举项转换为选项数组
  private getOptions(items: { [key: string]: string }): Array<{ value: string; label: string }> {
    return Object.keys(items).map(key => ({ value: key, label: items[key] }));
  }
}
