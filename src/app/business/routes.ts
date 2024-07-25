import { Routes } from '@angular/router';

import { GroupCustomerOrderComponent } from './sale001/group-customer-order.component';
import { CorporateCustomerOrderComponent } from './sale003/corporate-customer-order.component';

export const routes: Routes = [
  { path: 'sale001-group-customer-order', component: GroupCustomerOrderComponent },
  { path: 'sale003-corporate-customer-order', component: CorporateCustomerOrderComponent }
];
