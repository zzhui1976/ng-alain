export const CUSTOMERS = {
  '/customers': {
    total: 2,
    list: [
      {
        id: 10000,
        name: '张三',
        phone: '13800000000',
        email: 'zhangsan@example.com',
        address: '上海市长宁区中山公园',
        gender: 'male',
        birthday: '1990-01-01',
        id_card: '310105199001010000',
        occupation: '软件工程师',
        education: 'bachelor',
        marital_status: 'married',
        income_level: 10000,
        source: 'online',
        remark: '备注信息',
        status: 1,
        status_str: '正常',
        modified: 1505826527288,
        created: 1505826527288,
      },
      {
        id: 10001,
        name: '李四',
        phone: '13800000001',
        email: 'lisi@example.com',
        address: '上海市长宁区中山公园',
        gender: 'female',
        birthday: '1991-01-01',
        id_card: '310105199101010000',
        occupation: '产品经理',
        education: 'master',
        marital_status: 'single',
        income_level: 15000,
        source: 'offline',
        remark: '备注信息',
        status: 1,
        status_str: '正常',
        modified: 1505826527288,
        created: 1505826527288,
      },
    ],
  },

    '/contacts': {
    total: 2,
    list: [
      {
        id: 1,
        corporation: '法人1',
        name: '联系人1',
        department: '部门1',
        position: '职位1',
        phone: '1234567890',
        email: 'contact1@example.com',
        address: '地址1',
        note: '备注1'
      },
      {
        id: 2,
        corporation: '法人2',
        name: '联系人2',
        department: '部门2',
        position: '职位2',
        phone: '0987654321',
        email: 'contact2@example.com',
        address: '地址2',
        note: '备注2'
      }
    ]
  },

    '/families': {
    total: 2,
    list: [
      {
        id: 1,
        customerName: '客户1',
        familyName: '家属1',
        relation: '配偶',
        phone: '1234567890',
        email: 'family1@example.com',
        address: '地址1',
        note: '备注1'
      },
      {
        id: 2,
        customerName: '客户2',
        familyName: '家属2',
        relation: '子女',
        phone: '0987654321',
        email: 'family2@example.com',
        address: '地址2',
        note: '备注2'
      }
    ]
  },
    '/enterprises': {
    total: 2,
    list: [
      {
        id: 1,
        name: '企业1',
        industry: '科技',
        address: '地址1',
        phone: '1234567890',
        email: 'enterprise1@example.com',
        legalRepresentative: '张三',
        registeredCapital: '1000万',
        establishmentDate: '2020-01-01',
        businessScope: '软件开发',
        note: '备注1'
      },
      {
        id: 2,
        name: '企业2',
        industry: '制造',
        address: '地址2',
        phone: '0987654321',
        email: 'enterprise2@example.com',
        legalRepresentative: '李四',
        registeredCapital: '2000万',
        establishmentDate: '2019-01-01',
        businessScope: '机械制造',
        note: '备注2'
      }
    ]
  }
};