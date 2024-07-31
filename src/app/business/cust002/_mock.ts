import { MockRequest } from '@delon/mock';

const generateVisitData = (period: string, category: string) => {
  const data: any = {};
  const categories: string[] = [];

  let p_num_map: { [key: string]: number } = { today: 1, week: 7, month: 30, year: 12 };
  let p_num = p_num_map[period];

  if (category === 'industry') {
    categories.push('科技', '金融', '房地产', '制造', '消费', '政府机构');
  } else if (category === 'region') {
    categories.push('华北', '东北', '西北', '西南', '华中', '华东', '华南');
  }

  categories.forEach(cat => {
    data[cat] = [];
    for (let i = 0; i < p_num; i++) {
      data[cat].push(Math.floor(Math.random() * 100));
    }
  });

  let days = [...Array(p_num).keys()].map(i => i + 1);

  return { days, data };
};

export const CUST002_MOCK = {
  '/cust002/visit_analysis': (req: MockRequest) => {
    const period = req.queryString.period;
    const category = req.queryString.category;
    return generateVisitData(period, category);
  }
};
