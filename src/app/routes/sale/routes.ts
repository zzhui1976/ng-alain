import { Routes } from '@angular/router';

import { SaleCustomerOrderComponent } from './customer-order.component';
import { SaleOpportunityComponent } from './opportunity.component';
import { SalePoiComponent } from './poi.component';
import { SaleProductComponent } from './product.component';
import { SaleWarehouseComponent } from './warehouse.component';

export const routes: Routes = [
  { path: 'poi', component: SalePoiComponent },
  { path: 'product', component: SaleProductComponent },
  { path: 'opportunity', component: SaleOpportunityComponent },
  { path: 'warehouse', component: SaleWarehouseComponent },
  { path: 'customer-order', component: SaleCustomerOrderComponent }
];
