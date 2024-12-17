import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthenticationService } from '../../services/authentification/authentication.service';
import { environment } from '../../environments/environment';
import { provideTranslateService } from '@ngx-translate/core';
import { SalesTaxService } from '../../services/sales-tax/sales-tax.service';
import { TranslatableMessageService } from '../../services/translatable-message.service';
import { MessageService } from 'primeng/api';
import { InvoiceTemplateService } from '../../services/invoice-template/invoice-template.service';
import { FileService } from '../../services/file/file.service';
import { BASE_PATH } from '@invoice-manager/api-typescript-angular-client';
import { ToastModule } from 'primeng/toast';
import { BusinessPartnerService } from '../../services/business-partner/business-partner.service';
import { ContactPersonService } from '../../services/contact-person/contact-person.service';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { InvoicePositionService } from '../../services/invoice-position/invoice-position.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes, withHashLocation(), withComponentInputBinding()),
        provideOAuthClient(),
        provideHttpClient(),
        provideAnimations(),
        provideTranslateService(),
        importProvidersFrom(ToastModule),
        MessageService,
        provideIMServices(),
        {
            provide: BASE_PATH,
            useValue: environment.basePath,
        }
    ],
};

export function provideIMServices() {
    return [
        TranslatableMessageService,
        {
            provide: SalesTaxService,
            useClass: environment.salesTaxService,
        },
        {
            provide: AuthenticationService,
            useClass: environment.authenticationProvider,
        },
        {
            provide: InvoiceTemplateService,
            useClass: environment.invoiceTemplateService,
        },
        {
            provide: FileService,
            useClass: environment.fileService,
        },
        {
            provide: BusinessPartnerService,
            useClass: environment.businessPartnersService,
        },
        {
            provide: ContactPersonService,
            useClass: environment.contactPersonService,
        },
        {
            provide: InvoiceService,
            useClass: environment.invoiceService,
        },
        {
            provide: InvoicePositionService,
            useClass: environment.invoicePositionService,
        }
    ];
}
