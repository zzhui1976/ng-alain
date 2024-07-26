import { Routes } from '@angular/router';

import { GroupCustomerOrderComponent } from './sale001/group-customer-order.component';
import { CorporateCustomerOrderComponent } from './sale003/corporate-customer-order.component';
import { OrderAfterSalesComponent } from './sale005/order-after-sales.component';

export const routes: Routes = [
  { path: 'sale001-group-customer-order', component: GroupCustomerOrderComponent },
  { path: 'sale003-corporate-customer-order', component: CorporateCustomerOrderComponent },
  { path: 'sale005-order-after-sales', component: OrderAfterSalesComponent }
];
