import { MockRequest } from '@delon/mock';

const fundNames = [
  '国债ETF',
  '企业债ETF',
  '高收益债ETF',
  '短期融资券ETF',
  '中期票据ETF',
  '地方政府债ETF',
  '可转债ETF',
  '信用债ETF',
  '利率债ETF',
  '混合债ETF'
];

const bonds: string[] = [
  '国债10年',
  '国债5年',
  '企业债AAA',
  '企业债AA+',
  '地方政府债',
  '可转债',
  '短期融资券',
  '中期票据',
  '高收益债',
  '信用债'
];

const getRandomBonds = (arr: string[], count: number): string[] => {
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
    industryAssets: Array<{ value: number; name: string }>;
    riskAssets: Array<{ value: number; name: string }>;
    durationAssets: Array<{ value: number; name: string }>;
  }>;
  fundNames.forEach(fund => {
    const bds = getRandomBonds(bonds, 10);
    const topAssets = bds.map((x: string) => ({ value: Math.random() * 50, name: x }));

    const industryAssets = [
      { value: Math.random() * 50, name: '政府' },
      { value: Math.random() * 50, name: '企业' },
      { value: Math.random() * 50, name: '金融' },
      { value: Math.random() * 50, name: '其他' }
    ];
    const riskAssets = [
      { value: Math.random() * 50, name: '高风险' },
      { value: Math.random() * 50, name: '中风险' },
      { value: Math.random() * 50, name: '低风险' }
    ];

    const durationAssets = [
      { value: Math.random() * 50, name: '长期' },
      { value: Math.random() * 50, name: '中期' },
      { value: Math.random() * 50, name: '短期' }
    ];

    data.push({
      name: fund,
      topAssets,
      industryAssets,
      riskAssets,
      durationAssets
    });
  });
  return { data, trade_cal_range };
};

export const VIEW005_FUNDS = {
  '/view005/funds': (req: MockRequest) => {
    const from_date = req.queryString.from_date;
    const to_date = req.queryString.to_date;
    return generateRandomData(from_date, to_date);
  },
  '/view005/trade_cal': (req: MockRequest) => {
    return { trade_cal };
  }
};
