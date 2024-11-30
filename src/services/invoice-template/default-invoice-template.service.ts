import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { InvoiceTemplateService } from './invoice-template.service';
import { InvoiceTemplate } from '../../models/invoice-template.model';

@Injectable({
  providedIn: 'root'
})
export class DefaultInvoiceTemplateService implements InvoiceTemplateService {

  private readonly invoiceTemplates: WritableSignal<InvoiceTemplate[]> = signal([]);

  constructor() {
    this.invoiceTemplates.set([
      {
        id: 1,
        name: 'Meyer Limited',
        marginTopFirstPage: 40,
        marginBottomFirstPage: 40,
        marginTopOtherPages: 20,
        marginBottomOtherPages: 20,
        backgroundPdf: '',
      },
      {
        id: 2,
        name: 'Meyer non profit',
        marginTopFirstPage: 20,
        marginBottomFirstPage: 20,
        marginTopOtherPages: 30,
        marginBottomOtherPages: 30,
        backgroundPdf: '',
      }]);
  }

  createInvoiceTemplate(invoiceTemplate: InvoiceTemplate): Signal<InvoiceTemplate | undefined> {
    invoiceTemplate.id = this.invoiceTemplates().length + Math.random() + 10;
    this.invoiceTemplates.set([...this.invoiceTemplates(), invoiceTemplate]);
      console.log(this.invoiceTemplates());
    return signal(invoiceTemplate);
  }

  deleteInvoiceTemplate(invoiceTemplateId: number): Signal<InvoiceTemplate | undefined> {
    const deletedInvoiceTemplate = this.invoiceTemplates().find(
      (invoiceTemplate) => invoiceTemplate.id === invoiceTemplateId
    );
    if (deletedInvoiceTemplate) {
      this.invoiceTemplates.set(this.invoiceTemplates().filter(invoiceTemplate => invoiceTemplate.id !== deletedInvoiceTemplate.id));
    }
    return signal(deletedInvoiceTemplate);
  }

  getAllInvoiceTemplates(): Signal<InvoiceTemplate[] | undefined> {
    return this.invoiceTemplates.asReadonly();
  }

  getInvoiceTemplateById(invoiceTemplateId: number): Signal<InvoiceTemplate | undefined> {
    return signal(this.invoiceTemplates().find(invoiceTemplate => invoiceTemplate.id === invoiceTemplateId));
  }

  updateInvoiceTemplate(invoiceTemplateId: number, invoiceTemplate: InvoiceTemplate): Signal<InvoiceTemplate | undefined> {
    const updatedInvoiceTemplate = this.invoiceTemplates().find(invoiceTemplate => invoiceTemplate.id === invoiceTemplateId);
    if (updatedInvoiceTemplate) {
      const updatedInvoiceTemplates = this.invoiceTemplates().map(invoiceTemplate => invoiceTemplate.id === updatedInvoiceTemplate.id ? invoiceTemplate : updatedInvoiceTemplate);
      this.invoiceTemplates.set(updatedInvoiceTemplates);
    }
    return signal(invoiceTemplate);
  }


}
