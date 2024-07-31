import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  constructor() {}

  // 枚举对象
  private enums: { [key: string]: { [key: string]: string } } = {
    visitStatus: {
      '1': '计划中',
      '2': '已拜访',
      '3': '已取消',
      '4': '延期'
    },
    customerType: {
      '1': '企业',
      '2': '个人',
      '3': '政府机构',
      '4': '非营利组织'
    },
    visitResult: {
      '1': '达成合作',
      '2': '继续跟进',
      '3': '未达成合作',
      '4': '待定'
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
