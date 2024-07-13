import { Routes } from '@angular/router';

import { SalePoiComponent } from './poi.component';
import { SaleProductComponent } from './product.component';

export const routes: Routes = [
  { path: 'poi', component: SalePoiComponent },
  { path: 'product', component: SaleProductComponent }
];
