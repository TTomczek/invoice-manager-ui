import { AuthenticationMockService } from '../services/authentification/authentication-mock.service';
import { DefaultSalesTaxService } from '../services/sales-tax/default-sales-tax.service';
import { DefaultInvoiceTemplateService } from '../services/invoice-template/default-invoice-template.service';
import { DefaultFileService } from '../services/file/default-file.service';
import { DefaultBusinessPartnerService } from '../services/business-partner/default-business-partner.service';
import { DefaultContactPersonService } from '../services/contact-person/default-contact-person.service';
import { DefaultInvoiceService } from '../services/invoice/default-invoice.service';
import { DefaultInvoicePositionService } from '../services/invoice-position/default-invoice-position.service';
import { MockAuthInterceptor } from '../services/authentification/mock-auth-interceptor.service';

export const environment = {
    production: false,
    authenticationProvider: AuthenticationMockService,
    basePath: '',
    maxFileSize: 1048576 * 5, // 5MiB
    salesTaxService: DefaultSalesTaxService,
    invoiceTemplateService: DefaultInvoiceTemplateService,
    fileService: DefaultFileService,
    businessPartnersService: DefaultBusinessPartnerService,
    contactPersonService: DefaultContactPersonService,
    invoiceService: DefaultInvoiceService,
    invoicePositionService: DefaultInvoicePositionService,
    authInterceptor: MockAuthInterceptor
};
