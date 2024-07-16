export const POIS = {
  '/pois': {
    total: 2,
    list: [
      {
        id: 10000,
        user_id: 1,
        name: '测试品牌',
        branch_name: '测试分店',
        geo: 310105,
        country: '中国',
        province: '上海',
        city: '上海市',
        district: '长宁区',
        address: '中山公园',
        tel: '15900000000',
        categories: '2',
        lng: 121.41707989151003,
        lat: 31.218656214644792,
        recommend: '推荐品',
        special: '特色服务',
        introduction: '商户简介',
        open_time: '营业时间',
        avg_price: 260,
        reason: null,
        status: 1,
        status_str: '待审核',
        status_wx: 1,
        modified: 1505826527288,
        created: 1505826527288,
      },
      {
        id: 10001,
        user_id: 2,
        name: '测试品牌2',
        branch_name: '测试分店2',
        geo: 310105,
        country: '中国',
        province: '上海',
        city: '上海市',
        district: '长宁区',
        address: '中山公园',
        tel: '15900000000',
        categories: '3',
        lng: 121.41707989151003,
        lat: 31.218656214644792,
        recommend: '推荐品',
        special: '特色服务',
        introduction: '商户简介',
        open_time: '营业时间',
        avg_price: 260,
        reason: null,
        status: 1,
        status_str: '待审核',
        status_wx: 1,
        modified: 1505826527288,
        created: 1505826527288,
      },
    ],
  },

    '/products': {
    total: 2,
    list: [
      {
        id: 1,
        name: '产品1',
        category: '电子产品',
        brand: '品牌1',
        model: '型号1',
        price: 1000,
        stock: 100,
        productionDate: '2023-01-01',
        shelfLife: '1年',
        supplier: '供应商1',
        note: '备注1'
      },
      {
        id: 2,
        name: '产品2',
        category: '家居用品',
        brand: '品牌2',
        model: '型号2',
        price: 2000,
        stock: 200,
        productionDate: '2023-02-01',
        shelfLife: '2年',
        supplier: '供应商2',
        note: '备注2'
      }
    ]
  },
    '/opportunities': {
    total: 2,
    list: [
      {
        id: 1,
        name: '商机1',
        customer: '客户1',
        status: '进行中',
        amount: 10000,
        expectedDate: '2023-12-01',
        owner: '张三',
        createdDate: '2023-01-01',
        note: '备注1'
      },
      {
        id: 2,
        name: '商机2',
        customer: '客户2',
        status: '已完成',
        amount: 20000,
        expectedDate: '2023-11-01',
        owner: '李四',
        createdDate: '2023-02-01',
        note: '备注2'
      }
    ]
  },

    '/warehouses': {
    total: 2,
    list: [
      {
        "id":1,
        "name": "Project Alpha",
        "url": "https://project-alpha.com",
        "owner": "Emily Davis",
        "approver": "Michael Johnson",
        "date_range": {
          "start": "2023-03-01",
          "end": "2023-08-31"
        },
        "type": "Research",
        "name2": "Alpha Details",
        "summary": "A comprehensive research project on renewable energy sources.",
        "owner2": "Sarah Thompson",
        "approver2": "David Wilson",
        "time": "2023-05-15T09:00:00Z",
        "type2": "Phase 1",
        "items": [
          {
            "key": "alpha1",
            "workId": "A001",
            "name": "Solar Panel Study",
            "department": "Energy Research"
          },
          {
            "key": "alpha2",
            "workId": "A002",
            "name": "Wind Turbine Analysis",
            "department": "Energy Research"
          }
        ]
      },
      {
        "id":2,
        "name": "Marketing Campaign Beta",
        "url": "https://marketing-beta.com",
        "owner": "James Smith",
        "approver": "Linda Martinez",
        "date_range": {
          "start": "2023-06-01",
          "end": "2023-11-30"
        },
        "type": "Marketing",
        "name2": "Beta Strategy",
        "summary": "A strategic marketing campaign targeting millennials.",
        "owner2": "Karen White",
        "approver2": "Richard Harris",
        "time": "2023-07-20T14:30:00Z",
        "type2": "Phase 2",
        "items": [
          {
            "key": "beta1",
            "workId": "M001",
            "name": "Social Media Ads",
            "department": "Digital Marketing"
          },
          {
            "key": "beta2",
            "workId": "M002",
            "name": "Email Newsletter",
            "department": "Digital Marketing"
          }
        ]
      }
    ]
  }
};
