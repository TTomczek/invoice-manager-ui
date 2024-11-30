import { SalesTaxImplService } from '../services/sales-tax/sales-tax-impl.service';
import { InvoiceTemplateImplService } from '../services/invoice-template/invoice-template-impl.service';
import { FileImplService } from '../services/file/file-impl.service';
import { AuthenticationMockService } from '../services/authentification/authentication-mock.service';

export const environment = {
    production: false,
    authenticationProvider: AuthenticationMockService,
    basePath: '/invoice-manager-server',
    maxFileSize: 1048576 * 5, // 5MB
    salesTaxService: SalesTaxImplService,
    invoiceTemplateService: InvoiceTemplateImplService,
    fileService: FileImplService,
};
