import { MockRequest } from '@delon/mock';

const fundNames = [
  '无风险3年定存',
  '沪深300',
  '其他ETF基金1',
  '其他ETF基金2',
  '其他ETF基金3',
  '其他ETF基金4',
  '其他ETF基金5',
  '其他ETF基金6',
  '其他ETF基金7',
  '其他ETF基金8',
  '其他ETF基金9'
];

const generateRandomData = (days: number) => {
  const data = {} as { [key: string]: number[] };
  fundNames.forEach(fund => {
    data[fund] = [0];
    for (let i = 1; i < days; i++) {
      const prevReturn = data[fund][i - 1];
      const randomGrowth = (Math.random() * 20 - 10) / 100; // -10% to 10%
      const newReturn = (1 + prevReturn) * (1 + randomGrowth) - 1;
      data[fund].push(newReturn);
    }
  });
  return data;
};

export const FUNDS = {
  '/view002/funds': (req: MockRequest) => {
    const days = parseInt(req.queryString.days, 10) || 30;
    return generateRandomData(days);
  }
};
