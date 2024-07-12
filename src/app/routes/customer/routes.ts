import { Routes } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { LegalCustomerComponent } from './legal-customer.component';

export const routes: Routes = [
  { path: 'person-customer', component: CustomerComponent },
  { path: 'legal-customer', component: LegalCustomerComponent }
];
