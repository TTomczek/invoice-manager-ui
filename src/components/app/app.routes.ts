import { Route } from '@angular/router';
import { IMLayoutComponent } from '../layout/app.layout.component';
import { IMNotfoundComponent } from '../not-found/notfound.component';
import { InvoiceListComponent } from '../invoice-list-component/invoice-list.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: IMLayoutComponent,
    children: [
      {
        path: '',
        component: InvoiceListComponent
      }
    ]
  },
  {
    path: 'notfound',
    component: IMNotfoundComponent
  },
  {
    path: '**',
    redirectTo: '/notfound',
  },
];
