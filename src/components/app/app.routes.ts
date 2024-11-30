import { Route } from '@angular/router';
import { IMLayoutComponent } from '../layout/app.layout.component';
import { IMNotfoundComponent } from '../not-found/notfound.component';
import { InvoiceListComponent } from '../invoice-list-component/invoice-list.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SalesTaxListComponent } from '../sales-tax-list/sales-tax-list.component';
import { InvoiceTemplateListComponent } from '../invoice-template-list/invoice-template-list.component';
import { BusinessPartnersListComponent } from '../business-partners-list/business-partners-list.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: IMLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'invoices',
        component: InvoiceListComponent,
      },
      {
        path: 'business-partners',
        component: BusinessPartnersListComponent,
      },
      {
        path: 'invoice-templates',
        component: InvoiceTemplateListComponent
      },
      {
        path: 'sales-taxes',
        component: SalesTaxListComponent,
      }
    ],
  },
  {
    path: 'notfound',
    component: IMNotfoundComponent,
  },
  {
    path: '**',
    redirectTo: '/notfound',
  },
];
