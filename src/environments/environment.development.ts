import { AuthenticationMockService } from '../services/authentification/authentication-mock.service';
import { DefaultSalesTaxService } from '../services/sales-tax/default-sales-tax.service';
import { DefaultInvoiceTemplateService } from '../services/invoice-template/default-invoice-template.service';
import { DefaultFileService } from '../services/file/default-file.service';
import { SalesTaxImplService } from '../services/sales-tax/sales-tax-impl.service';

export const environment = {
    production: false,
    authenticationProvider: AuthenticationMockService,
    basePath: '/invoice-manager-server',
    maxFileSize: 1048576 * 5, // 5MiB
    salesTaxService: SalesTaxImplService,
    invoiceTemplateService: DefaultInvoiceTemplateService,
    fileService: DefaultFileService,
};
