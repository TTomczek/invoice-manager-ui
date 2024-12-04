import { AuthenticationMockService } from '../services/authentification/authentication-mock.service';
import { DefaultSalesTaxService } from '../services/sales-tax/default-sales-tax.service';
import { DefaultInvoiceTemplateService } from '../services/invoice-template/default-invoice-template.service';
import { DefaultFileService } from '../services/file/default-file.service';
import { SalesTaxImplService } from '../services/sales-tax/sales-tax-impl.service';
import { InvoiceTemplateImplService } from '../services/invoice-template/invoice-template-impl.service';
import { FileImplService } from '../services/file/file-impl.service';
import { DefaultBusinessPartnerService } from '../services/business-partner/default-business-partner.service';
import { BusinessPartnerImplService } from '../services/business-partner/business-partner-impl.service';

// TODO Switch back to Default Services
export const environment = {
    production: false,
    authenticationProvider: AuthenticationMockService,
    basePath: '/invoice-manager-server',
    maxFileSize: 1048576 * 5, // 5MiB
    salesTaxService: SalesTaxImplService,
    invoiceTemplateService: InvoiceTemplateImplService,
    fileService: FileImplService,
    businessPartnersService: BusinessPartnerImplService
};
