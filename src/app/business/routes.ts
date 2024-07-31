import { Routes } from '@angular/router';

import { CustomerVisitComponent } from './cust001/customer-visit.component';
import { CustomerVisitAnalysisComponent } from './cust002/customer-visit-analysis.component';
import { GroupCustomerOrderComponent } from './sale001/group-customer-order.component';
import { CorporateCustomerOrderComponent } from './sale003/corporate-customer-order.component';
import { OrderAfterSalesComponent } from './sale005/order-after-sales.component';
import { InvestmentRiskDashboardComponent } from './view001/investment-risk-dashboard.component';
import { FundChartComponent } from './view002/fund-chart.component';
import { RiskAnalysisComponent } from './view003/risk-analysis.component';
import { FundEquityAnalysisComponent } from './view004/fund-equity-analysis.component';
import { FixedIncomeAnalysisComponent } from './view005/fixed-income-analysis.component';
import { PortfolioAnalysisComponent } from './view006/portfolio-analysis.component';
import { AssetCategoryAnalysisComponent } from './view007/asset-category-analysis.component';
import { FundPerformanceChartComponent } from './view008/fund-performance-chart.component';

export const routes: Routes = [
  { path: 'sale001-group-customer-order', component: GroupCustomerOrderComponent },
  { path: 'sale003-corporate-customer-order', component: CorporateCustomerOrderComponent },
  { path: 'sale005-order-after-sales', component: OrderAfterSalesComponent },
  { path: 'view001-investment-risk-dashboard', component: InvestmentRiskDashboardComponent },
  { path: 'view002-fund-chart', component: FundChartComponent },
  { path: 'view003-risk-analysis', component: RiskAnalysisComponent },
  { path: 'view004-fund-equity-analysis', component: FundEquityAnalysisComponent },
  { path: 'view005-fixed-income-analysis', component: FixedIncomeAnalysisComponent },
  { path: 'view006-portfolio-analysis', component: PortfolioAnalysisComponent },
  { path: 'view007-asset-category-analysis', component: AssetCategoryAnalysisComponent },
  { path: 'view008-fund-performance-chart', component: FundPerformanceChartComponent },
  { path: 'cust001-customer-visit', component: CustomerVisitComponent },
  { path: 'cust002-customer-visit-analysis', component: CustomerVisitAnalysisComponent }
];
