import { SalesTaxImplService } from '../services/sales-tax/sales-tax-impl.service';
import { InvoiceTemplateImplService } from '../services/invoice-template/invoice-template-impl.service';
import { FileImplService } from '../services/file/file-impl.service';
import { AuthenticationImplService } from '../services/authentification/authentication-impl.service';
import { BusinessPartnerImplService } from '../services/business-partner/business-partner-impl.service';
import { ContactPersonImplService } from '../services/contact-person/contact-person-impl.service';

export const environment = {
    production: false,
    authenticationProvider: AuthenticationImplService,
    basePath: '/invoice-manager-server',
    maxFileSize: 1048576 * 5, // 5MB
    salesTaxService: SalesTaxImplService,
    invoiceTemplateService: InvoiceTemplateImplService,
    fileService: FileImplService,
    businessPartnersService: BusinessPartnerImplService,
    contactPersonService: ContactPersonImplService
};
