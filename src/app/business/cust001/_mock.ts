import { MockRequest } from '@delon/mock';

const list: any[] = [
  {
    id: 1,
    customer: { id: 1, name: 'xx有限责任公司' },
    visit_date: '2023-09-01',
    visit_status: '1',
    customer_type: '1',
    visit_result: '1',
    contact_person: '张三',
    contact_phone: '13800138000',
    email: 'zhangsan@example.com',
    visit_purpose: '商讨合作事宜',
    visit_remarks: '客户对新产品感兴趣',
    visit_location: '北京',
    visit_staff: '李四',
    follow_up_actions: '安排下次会议',
    attachments: []
  },
  {
    id: 2,
    customer: { id: 2, name: 'xx总局' },
    visit_date: '2023-09-03',
    visit_status: '2',
    customer_type: '3',
    visit_result: '2',
    contact_person: '李四',
    contact_phone: '13900139000',
    email: 'lisi@example.com',
    visit_purpose: '了解项目进展',
    visit_remarks: '项目进展顺利',
    visit_location: '上海',
    visit_staff: '王五',
    follow_up_actions: '提交项目报告',
    attachments: []
  }
];

function genData(params: any): { total: number; list: any[] } {
  let ret = [...list];
  const pi = +params.pi;
  const ps = +params.ps;
  const start = (pi - 1) * ps;

  if (params.customer_name) {
    ret = ret.filter(data => data.customer.name.indexOf(params.customer_name) > -1);
  }
  if (params.status) {
    ret = ret.filter(data => data.visit_status === params.status);
  }
  return { total: ret.length, list: ret.slice(start, ps * pi) };
}

function saveData(id: number, value: any): { msg: string } {
  if (!id) {
    value.id = Math.max(...list.map(item => item.id)) + 1;
    list.push(value);
    return { msg: 'ok' };
  }
  const item = list.find(w => w.id === id);
  if (!item) {
    return { msg: '无效数据' };
  }
  Object.assign(item, value);
  return { msg: 'ok' };
}

export const CUSTOMER_VISIT = {
  '/cust001/customer-visit/query': (req: MockRequest) => genData(req.queryString),
  '/cust001/customer-visit/load/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id),
  'POST /cust001/customer-visit/save/:id': (req: MockRequest) => saveData(+req.params.id, req.body)
};
