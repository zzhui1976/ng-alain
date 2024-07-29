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

const stocks: string[] = [
  '贵州茅台',
  '工商银行',
  '建设银行',
  '中国石油',
  '中国平安',
  '中国人寿',
  '中国银行',
  '中国建筑',
  '中国神华',
  '交通银行',
  '农业银行',
  '光大银行',
  '中信银行',
  '中国太保',
  '兴业银行',
  '新华保险',
  '大秦铁路',
  '中国交建',
  '中国电建',
  '中国核电'
];

const getRandomStocks = (arr: string[], count: number): string[] => {
  const shuffled = arr.slice(0); // 复制数组
  let i = arr.length;
  const min = i - count;
  let temp: string, index: number;

  // 洗牌算法
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(min);
};

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
  const data = [] as Array<{
    name: string;
    topAssets: Array<{ value: number; name: string }>;
    valueAssets: Array<{ value: number; name: string }>;
    industryAssets: Array<{ value: number; name: string }>;
    scaleAssets: Array<{ value: number; name: string }>;
  }>;
  fundNames.forEach(fund => {
    const sts = getRandomStocks(stocks, 10);
    const topAssets = sts.map((x: string) => ({ value: Math.random() * 50, name: x }));

    const industryAssets = [
      { value: Math.random() * 50, name: '科技' },
      { value: Math.random() * 50, name: '金融' },
      { value: Math.random() * 50, name: '房地产' },
      { value: Math.random() * 50, name: '制造' },
      { value: Math.random() * 50, name: '流通' },
      { value: Math.random() * 50, name: '消费' }
    ];
    const valueAssets = [
      { value: Math.random() * 50, name: '高估值' },
      { value: Math.random() * 50, name: '中估值' },
      { value: Math.random() * 50, name: '低估值' }
    ];

    const scaleAssets = [
      { value: Math.random() * 50, name: '大盘股' },
      { value: Math.random() * 50, name: '中盘股' },
      { value: Math.random() * 50, name: '小盘股' }
    ];

    data.push({
      name: fund,
      valueAssets,
      topAssets,
      industryAssets,
      scaleAssets
    });
  });
  return { data, trade_cal_range };
};

export const VIEW004_FUNDS = {
  '/view004/funds': (req: MockRequest) => {
    const from_date = req.queryString.from_date;
    const to_date = req.queryString.to_date;
    return generateRandomData(from_date, to_date);
  },
  '/view004/trade_cal': (req: MockRequest) => {
    return { trade_cal };
  }
};
