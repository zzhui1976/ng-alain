import { Component } from '@angular/core';
import { SharedModule } from '@shared';

@Component({
  selector: 'app-view001-investment-risk-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './investment-risk-dashboard.component.html',
  styleUrls: ['./investment-risk-dashboard.component.css']
})
export class InvestmentRiskDashboardComponent {
  // 数据模型示例，实际应用中应从服务或API获取数据
  riskData = {
    totalInvestment: 1000000,
    riskLevel: 'High',
    recentChanges: [
      { date: '2023-10-01', change: '+5%' },
      { date: '2023-09-30', change: '-3%' },
      { date: '2023-09-29', change: '+2%' }
    ],
    topRiskyAssets: [
      { name: 'Asset A', risk: 'High' },
      { name: 'Asset B', risk: 'Medium' },
      { name: 'Asset C', risk: 'Low' }
    ]
  };

  constructor() {}
}
