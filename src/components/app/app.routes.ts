import { Route } from '@angular/router';
import { IMLayoutComponent } from '../layout/app.layout.component';
import { IMNotfoundComponent } from '../not-found/notfound.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: IMLayoutComponent,
    children: [

    ]
  },
  {
    path: 'notfound',
    component: IMNotfoundComponent
  },
  {
    path: '**',
    redirectTo: '/notfound',
  }
];
