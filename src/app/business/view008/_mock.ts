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

const trade_months: string[] = [];

for (let i = 12; i >= 1; i--) {
  let currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - i);
  trade_months.push(currentDate.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit' }));
}

const shuffle = (arr: any[]): any[] => {
  const shuffled = arr.slice(0); // 复制数组
  let i = arr.length;
  const min = 0;
  let temp: any, index: number;

  // 洗牌算法
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(min);
};

const generateRandomData = (from_month: string, to_month: string) => {
  let from_index = trade_months.indexOf(from_month) || 0;
  let to_index = trade_months.indexOf(to_month) || 12;
  let months: number = to_index - from_index + 1;
  let trade_months_range = trade_months.slice(from_index, to_index + 1);
  const data = {} as { [key: string]: number[] };

  fundNames.forEach(fund => {
    data[fund] = [];
  });

  let ranks = [...Array(fundNames.length).keys()].map(i => i + 1);
  for (let i = 0; i < months; i++) {
    let tmp = shuffle(ranks);
    for (let j = 0; j < fundNames.length; j++) {
      let fund = fundNames[j];
      data[fund].push(tmp[j]);
    }
  }

  return { data, trade_months_range };
};

export const VIEW008_FUNDS = {
  '/view008/funds': (req: MockRequest) => {
    const from_month = req.queryString.from_month;
    const to_month = req.queryString.to_month;
    return generateRandomData(from_month, to_month);
  },
  '/view008/trade_months': (req: MockRequest) => {
    return { trade_months };
  }
};
