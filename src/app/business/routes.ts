import { Routes } from '@angular/router';

import { GroupCustomerOrderComponent } from './sale001/group-customer-order.component';
import { CorporateCustomerOrderComponent } from './sale003/corporate-customer-order.component';
import { OrderAfterSalesComponent } from './sale005/order-after-sales.component';
import { InvestmentRiskDashboardComponent } from './view001/investment-risk-dashboard.component';
import { FundChartComponent } from './view002/fund-chart.component';

export const routes: Routes = [
  { path: 'sale001-group-customer-order', component: GroupCustomerOrderComponent },
  { path: 'sale003-corporate-customer-order', component: CorporateCustomerOrderComponent },
  { path: 'sale005-order-after-sales', component: OrderAfterSalesComponent },
  { path: 'view001-investment-risk-dashboard', component: InvestmentRiskDashboardComponent },
  { path: 'view002-fund-chart', component: FundChartComponent }
];
