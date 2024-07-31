import { MockRequest } from '@delon/mock';

const portfolios = [
  { id: '1', name: '组合A' },
  { id: '2', name: '组合B' },
  { id: '3', name: '组合C' },
  { id: '4', name: '组合D' },
  { id: '5', name: '组合E' },
  { id: '6', name: '组合F' },
  { id: '6', name: '组合G' },
  { id: '7', name: '组合H' },
  { id: '8', name: '组合I' },
  { id: '9', name: '组合J' },
  { id: '10', name: '组合K' }
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
  { id: '2-4', name: '城投债', parent_id: '2' },
  { id: '1-1-1', name: 'A股(科技)', parent_id: '1-1' },
  { id: '1-1-2', name: 'A股(金融)', parent_id: '1-1' },
  { id: '1-1-3', name: 'A股(房地产)', parent_id: '1-1' },
  { id: '1-1-4', name: 'A股(制作)', parent_id: '1-1' },
  { id: '1-1-5', name: 'A股(消费)', parent_id: '1-1' },
  { id: '1-1-6', name: 'A股(互联网)', parent_id: '1-1' }
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

const generateRandomData = (asset_category_id: string, portfolio_ids: string[], from_date: string, to_date: string) => {
  let from_index = trade_cal.indexOf(from_date) || 0;
  let to_index = trade_cal.indexOf(to_date) || 100;
  let days: number = to_index - from_index + 1;
  let trade_cal_range = trade_cal.slice(from_index, to_index + 1);
  const data = {} as { [key: string]: number[] };

  portfolio_ids.forEach(portfolio_id => {
    let portfolio = portfolios.find(x => x.id == portfolio_id);
    let portfolio_name = portfolio ? portfolio.name : portfolio_id;
    data[portfolio_name] = [Math.random() * 30];
    for (let i = 1; i < days; i++) {
      const prevPercentage = data[portfolio_name][i - 1];
      const randomPercentage = Math.random() * 2 - 1; // -1% to 1%
      data[portfolio_name].push(prevPercentage + randomPercentage);
    }
  });
  return { data, trade_cal_range };
};

export const VIEW007_MOCK = {
  '/view007/portfolios': (req: MockRequest) => {
    return { portfolios };
  },
  '/view007/asset_tree': (req: MockRequest) => {
    return { assetTree };
  },
  '/view007/trade_cal': (req: MockRequest) => {
    return { trade_cal };
  },
  '/view007/asset_category_analysis': (req: MockRequest) => {
    const asset_category_id = req.queryString.asset_category_id;
    const portfolio_ids = req.queryString.portfolio_ids.split(',');
    const from_date = req.queryString.from_date;
    const to_date = req.queryString.to_date;
    return generateRandomData(asset_category_id, portfolio_ids, from_date, to_date);
  }
};
