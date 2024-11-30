import { Signal } from '@angular/core';
import { InvoiceTemplate } from '../../models/invoice-template.model';

export abstract class InvoiceTemplateService {
  abstract getAllInvoiceTemplates(): Signal<InvoiceTemplate[] | undefined>;
  abstract createInvoiceTemplate(invoiceTemplate: InvoiceTemplate): Signal<InvoiceTemplate | undefined>;
  abstract deleteInvoiceTemplate(invoiceTemplateId: number): Signal<InvoiceTemplate | undefined>;
  abstract updateInvoiceTemplate(invoiceTemplateId: number, invoiceTemplate: InvoiceTemplate): Signal<InvoiceTemplate | undefined>;
  abstract getInvoiceTemplateById(invoiceTemplateId: number): Signal<InvoiceTemplate | undefined>;
}
