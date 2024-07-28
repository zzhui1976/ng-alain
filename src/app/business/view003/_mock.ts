import { MockRequest } from '@delon/mock';

const fundNames = [
  '沪深300ETF',
  '新能源ETF',
  '智能出行ETF',
  '消费行业ETF',
  '中证100ETF',
  '港股互联网ETF',
  '港股房地产ETF',
  '医药100ETF',
  '信创概念ETF',
  'TMT50ETF'
];

const trade_cal: string[] = [];
for (let i = 100; i >= 0; i--) {
  let currentDate = new Date();

  // 设置当前日期前100天的日期
  currentDate.setDate(currentDate.getDate() - i);
  trade_cal.push(currentDate.toLocaleDateString());
}

const generateRandomData = (from_date: string, to_date: string) => {
  let from_index = trade_cal.indexOf(from_date) || 0;
  let to_index = trade_cal.indexOf(to_date) || 100;
  let days: number = to_index - from_index + 1;
  let trade_cal_range = trade_cal.slice(from_index, to_index + 1);
  const data = {} as { [key: string]: { [key: string]: number[] } };
  fundNames.forEach(fund => {
    data[fund] = {
      收益率: [],
      风险指标: [],
      风险溢价率: []
    };
    for (let i = 0; i < days; i++) {
      data[fund]['收益率'].push(Math.random() * 20 - 10); // -10% to 10%
      data[fund]['风险指标'].push(Math.random() * 20 - 10); // -10% to 10%
      data[fund]['风险溢价率'].push(Math.random() * 20 - 10); // -10% to 10%
    }
  });
  return { data, trade_cal_range };
};

export const VIEW003_FUNDS = {
  '/view003/funds': (req: MockRequest) => {
    const from_date = req.queryString.from_date;
    const to_date = req.queryString.to_date;
    return generateRandomData(from_date, to_date);
  },
  '/view003/trade_cal': (req: MockRequest) => {
    return { trade_cal };
  }
};
