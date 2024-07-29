import { MockRequest } from '@delon/mock';

const portfolios = [
  { id: '1', name: '组合A' },
  { id: '2', name: '组合B' },
  { id: '3', name: '组合C' }
];

const assetTree = [
  {
    title: '资产分类1',
    key: '1',
    children: [
      { title: '子分类1-1', key: '1-1', isLeaf: true },
      { title: '子分类1-2', key: '1-2', isLeaf: true }
    ]
  },
  {
    title: '资产分类2',
    key: '2',
    children: [
      { title: '子分类2-1', key: '2-1', isLeaf: true },
      { title: '子分类2-2', key: '2-2', isLeaf: true }
    ]
  }
];

const trade_cal: string[] = [];
for (let i = 100; i >= 0; i--) {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - i);
  trade_cal.push(currentDate.toLocaleDateString());
}

const generateRandomData = (portfolio_id: string, asset_ids: string[], from_date: string, to_date: string) => {
  let from_index = trade_cal.indexOf(from_date) || 0;
  let to_index = trade_cal.indexOf(to_date) || 100;
  let days: number = to_index - from_index + 1;
  let trade_cal_range = trade_cal.slice(from_index, to_index + 1);
  const data = {} as { [key: string]: number[] };
  asset_ids.forEach(asset_id => {
    data[asset_id] = [];
    for (let i = 0; i < days; i++) {
      const randomPercentage = (Math.random() * 20 - 10) / 100; // -10% to 10%
      data[asset_id].push(randomPercentage);
    }
  });
  return { data, trade_cal_range };
};

export const VIEW006_MOCK = {
  '/view006/portfolios': (req: MockRequest) => {
    return { portfolios };
  },
  '/view006/asset_tree': (req: MockRequest) => {
    return { assetTree };
  },
  '/view006/trade_cal': (req: MockRequest) => {
    return { trade_cal };
  },
  '/view006/portfolio_analysis': (req: MockRequest) => {
    const portfolio_id = req.queryString.portfolio_id;
    const asset_ids = req.queryString.asset_ids.split(',');
    const from_date = req.queryString.from_date;
    const to_date = req.queryString.to_date;
    return generateRandomData(portfolio_id, asset_ids, from_date, to_date);
  }
};
