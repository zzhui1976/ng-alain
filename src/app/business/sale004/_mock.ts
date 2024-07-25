import { MockRequest } from '@delon/mock';

const list: any[] = [
  {
    id: 1,
    customer: { id: 1, name: 'xx有限责任公司' },
    total_amount: 1500,
    status: '1',
    order_date: '2023-09-01',
    customer_address: '北京市海淀区',
    customer_phone: '13800138000',
    legal_representative: '张三',
    registered_capital: 1000000,
    establishment_date: '2020-01-01',
    business_scope: '电子产品销售',
    tax_registration_number: '123456789',
    organization_code: '987654321',
    business_license_number: 'ABC123456',
    bank_name: '中国银行',
    bank_account: '1234567890123456',
    contact_person: '李四',
    contact_phone: '13900139000',
    email: 'zhangsan@example.com',
    postal_code: '100080',
    remarks: '备注信息',
    items: [
      {
        key: 'item1',
        product_id: 'P001',
        product_name: '笔记本电脑',
        quantity: 1,
        price: 5000
      },
      {
        key: 'item2',
        product_id: 'P002',
        product_name: '无线鼠标',
        quantity: 2,
        price: 100
      }
    ],
    payments: [
      {
        key: 'payment1',
        payment_id: 'PAY001',
        payment_date: '2023-09-02',
        amount: 500,
        status: '2'
      },
      {
        key: 'payment2',
        payment_id: 'PAY002',
        payment_date: '2023-09-03',
        amount: 1000,
        status: '3'
      }
    ]
  },
  {
    id: 2,
    customer: { id: 2, name: 'xx总局' },
    total_amount: 2000,
    status: '2',
    order_date: '2023-09-03',
    customer_address: '上海市浦东新区',
    customer_phone: '13900139000',
    legal_representative: '李四',
    registered_capital: 2000000,
    establishment_date: '2019-01-01',
    business_scope: '家居用品销售',
    tax_registration_number: '987654321',
    organization_code: '123456789',
    business_license_number: 'DEF123456',
    bank_name: '工商银行',
    bank_account: '6543210987654321',
    contact_person: '王五',
    contact_phone: '13800138000',
    email: 'lisi@example.com',
    postal_code: '200120',
    remarks: '备注信息',
    items: [
      {
        key: 'item3',
        product_id: 'P003',
        product_name: '智能手表',
        quantity: 1,
        price: 2000
      }
    ],
    payments: [
      {
        key: 'payment3',
        payment_id: 'PAY003',
        payment_date: '2023-09-04',
        amount: 1000,
        status: '2'
      },
      {
        key: 'payment4',
        payment_id: 'PAY004',
        payment_date: '2023-09-05',
        amount: 1000,
        status: '3'
      }
    ]
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
    ret = ret.filter(data => data.status === params.status);
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

export const LEGAL_CUSTOMER_ORDER = {
  '/sale004/legal-customer-order/query': (req: MockRequest) => genData(req.queryString),
  '/sale004/legal-customer-order/load/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id),
  'POST /sale004/legal-customer-order/save/:id': (req: MockRequest) => saveData(+req.params.id, req.body)
};
