import { Route } from '@angular/router';
import { IMLayoutComponent } from '../layout/app.layout.component';
import { IMNotfoundComponent } from '../not-found/notfound.component';
import { InvoiceListComponent } from '../invoice-list-component/invoice-list.component';
import { SalesTaxListComponent } from '../sales-tax-list/sales-tax-list.component';
import { InvoiceTemplateListComponent } from '../invoice-template-list/invoice-template-list.component';
import { BusinessPartnersListComponent } from '../business-partners-list/business-partners-list.component';
import { ContactPersonListComponent } from '../contact-person-list/contact-person-list.component';
import { InvoicePositionsListComponent } from '../invoice-positions-list/invoice-positions-list.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: IMLayoutComponent,
        children: [
            {
                path: 'invoices',
                component: InvoiceListComponent
            },
            {
                path: 'invoices/:id/positions',
                component: InvoicePositionsListComponent
            },
            {
                path: 'business-partners',
                component: BusinessPartnersListComponent
            },
            {
                path: 'business-partners/:id/contact-persons',
                component: ContactPersonListComponent
            },
            {
                path: 'invoice-templates',
                component: InvoiceTemplateListComponent
            },
            {
                path: 'sales-taxes',
                component: SalesTaxListComponent
            }
        ]
    },
    {
        path: 'notfound',
        component: IMNotfoundComponent
    },
    {
        path: '**',
        redirectTo: '/notfound'
    }
];
