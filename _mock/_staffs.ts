export const STAFFS = {
  '/staffs': {
    total: 2,
    list: [
      {
        id: 10000,
        corporation: '法人1',
        name: '雇员1',
        department: '部门1',
        rank: '职级1',
        join_date: '2023-01-01',
        resume: [
          { time: '2023-01-01', event: '入职', note: '无' },
          { time: '2023-02-01', event: '晋升', note: '无' }
        ]
      },
      {
        id: 10001,
        corporation: '法人2',
        name: '雇员2',
        department: '部门2',
        rank: '职级2',
        join_date: '2023-01-02',
        resume: [
          { time: '2023-01-02', event: '入职', note: '无' },
          { time: '2023-02-02', event: '晋升', note: '无' }
        ]
      }
    ]
  }
};