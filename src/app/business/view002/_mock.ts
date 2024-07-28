import { MockRequest } from '@delon/mock';

const fundNames = [
  '无风险3年定存',
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
  const data = {} as { [key: string]: number[] };
  fundNames.forEach(fund => {
    data[fund] = [0];
    for (let i = 1; i < days; i++) {
      const prevReturn = data[fund][i - 1];
      const randomGrowth = fund == '无风险3年定存' ? 1.5 / 360 : (Math.random() * 20 - 9) / 100; // -10% to 10%
      const newReturn = (1 + prevReturn) * (1 + randomGrowth) - 1;
      data[fund].push(newReturn);
    }
  });
  return { data, trade_cal_range };
};

export const FUNDS = {
  '/view002/funds': (req: MockRequest) => {
    const from_date = req.queryString.from_date;
    const to_date = req.queryString.to_date;
    return generateRandomData(from_date, to_date);
  },
  '/view002/trade_cal': (req: MockRequest) => {
    return { trade_cal };
  }
};
