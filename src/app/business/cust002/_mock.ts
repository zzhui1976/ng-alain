import { MockRequest } from '@delon/mock';

const generateVisitData = (period: string, category: string) => {
  const data: any = {};
  const categories: string[] = [];

  let p_num_map: { [key: string]: number } = { today: 1, week: 7, month: 30, year: 12 };
  let p_num = p_num_map[period];

  if (category === 'customer') {
    categories.push('客户A', '客户B', '客户C', '客户D', '客户E');
  } else if (category === 'region') {
    categories.push('区域A', '区域B', '区域C', '区域D', '区域E');
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
