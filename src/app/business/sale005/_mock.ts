import { MockRequest } from '@delon/mock';

const list: any[] = [
  {
    id: 1,
    customer: { id: 1, name: 'xx有限责任公司' },
    total_amount: 1500,
    payment_status: '1',
    delivery_status: '1',
    return_status: '1',
    order_date: '2023-09-01',
    payment_periods: 3,
    overdue_fine: 100,
    delivery_address: '北京市海淀区',
    return_reason: '质量问题',
    contact_person: '张三',
    contact_phone: '13800138000',
    email: 'zhangsan@example.com',
    postal_code: '100080',
    remarks: '备注信息'
  },
  {
    id: 2,
    customer: { id: 2, name: 'xx总局' },
    total_amount: 2000,
    payment_status: '2',
    delivery_status: '2',
    return_status: '2',
    order_date: '2023-09-03',
    payment_periods: 2,
    overdue_fine: 50,
    delivery_address: '上海市浦东新区',
    return_reason: '尺寸不合适',
    contact_person: '李四',
    contact_phone: '13900139000',
    email: 'lisi@example.com',
    postal_code: '200120',
    remarks: '备注信息'
  }
];

function genData(params: any): { total: number; list: any[] } {
  let ret = [...list];
  const pi = +params.pi;
  const ps = +params.ps;
  const start = (pi - 1) * ps;

  if (params.order_id) {
    ret = ret.filter(data => `${data.id}`.indexOf(params.order_id) > -1);
  }
  if (params.customer_name) {
    ret = ret.filter(data => data.customer.name.indexOf(params.customer_name) > -1);
  }
  if (params.status) {
    ret = ret.filter(data => data.payment_status === params.status);
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

export const ORDER_AFTER_SALES = {
  '/sale005/order-after-sales/query': (req: MockRequest) => genData(req.queryString),
  '/sale005/order-after-sales/load/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id),
  'POST /sale005/order-after-sales/save/:id': (req: MockRequest) => saveData(+req.params.id, req.body)
};
