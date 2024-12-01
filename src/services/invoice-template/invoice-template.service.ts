import { InvoiceTemplate } from '../../models/invoice-template.model';

export abstract class InvoiceTemplateService {
    abstract getAllInvoiceTemplates(): Promise<InvoiceTemplate[] | undefined>;
    abstract createInvoiceTemplate(invoiceTemplate: InvoiceTemplate): Promise<InvoiceTemplate | undefined>;
    abstract deleteInvoiceTemplate(invoiceTemplateId: number): Promise<InvoiceTemplate | undefined>;
    abstract updateInvoiceTemplate(invoiceTemplateId: number, invoiceTemplate: InvoiceTemplate): Promise<InvoiceTemplate | undefined>;
}
