import { Routes } from '@angular/router';

import { EmployeeStaffComponent } from '../employee/staff.component';
import { ContactComponent } from './contact.component';
import { CustomerComponent } from './customer.component';
import { CustomerEnterpriseComponent } from './enterprise.component';
import { CustomerFamilyComponent } from './family.component';
import { LegalCustomerComponent } from './legal-customer.component';

export const routes: Routes = [
  { path: 'person-customer', component: CustomerComponent },
  { path: 'legal-customer', component: LegalCustomerComponent },
  { path: 'staff', component: EmployeeStaffComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'family', component: CustomerFamilyComponent },
  { path: 'enterprise', component: CustomerEnterpriseComponent }
];
