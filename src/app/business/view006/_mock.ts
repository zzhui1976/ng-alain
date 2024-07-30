import { MockRequest } from '@delon/mock';

const portfolios = [
  { id: '1', name: '组合A' },
  { id: '2', name: '组合B' },
  { id: '3', name: '组合C' },
  { id: '4', name: '组合D' },
  { id: '5', name: '组合E' },
  { id: '6', name: '组合F' }
];

const assets = [
  { id: '1', name: '权益类', parent_id: '0' },
  { id: '2', name: '固收类', parent_id: '0' },
  { id: '1-1', name: 'A股', parent_id: '1' },
  { id: '1-2', name: '港股', parent_id: '1' },
  { id: '1-3', name: '美股', parent_id: '1' },
  { id: '2-1', name: '国债', parent_id: '2' },
  { id: '2-2', name: '地方债', parent_id: '2' },
  { id: '2-3', name: '企业债', parent_id: '2' },
  { id: '2-4', name: '城投债', parent_id: '2' }
];

const buildTree = (data: any[], parentId: string | null = ''): any[] => {
  return data
    .filter(item => item.parent_id === parentId)
    .map(item => {
      const children = buildTree(data, item.id);
      return {
        title: item.name,
        key: item.id,
        isLeaf: children.length === 0,
        children: children
      };
    });
};

const assetTree = buildTree(assets, '0');

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
    let asset = assets.find(x => x.id == asset_id);
    let asset_name = asset ? asset.name : asset_id;
    data[asset_name] = [];
    for (let i = 0; i < days; i++) {
      const randomPercentage = (Math.random() * 20 - 10) / 100; // -10% to 10%
      data[asset_name].push(randomPercentage);
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
