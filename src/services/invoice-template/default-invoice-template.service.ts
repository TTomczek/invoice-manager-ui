import { Injectable } from '@angular/core';
import { InvoiceTemplateService } from './invoice-template.service';
import { InvoiceTemplate } from '../../models/invoice-template.model';

@Injectable({
    providedIn: 'root',
})
export class DefaultInvoiceTemplateService implements InvoiceTemplateService {
    private invoiceTemplates: InvoiceTemplate[] = [];

    constructor() {
        this.invoiceTemplates.push(
            {
                id: 1,
                name: 'Meyer Limited',
                marginTopFirstPage: 40,
                marginBottomFirstPage: 40,
                marginTopOtherPages: 20,
                marginBottomOtherPages: 20,
                backgroundPdf: undefined,
            },
            {
                id: 2,
                name: 'Meyer non profit',
                marginTopFirstPage: 20,
                marginBottomFirstPage: 20,
                marginTopOtherPages: 30,
                marginBottomOtherPages: 30,
                backgroundPdf: undefined,
            }
        );
    }

    async createInvoiceTemplate(invoiceTemplate: InvoiceTemplate): Promise<InvoiceTemplate | undefined> {
        invoiceTemplate.id = this.invoiceTemplates.length + Math.random() + 10;
        this.invoiceTemplates.push(invoiceTemplate);
        return Promise.resolve(invoiceTemplate);
    }

    deleteInvoiceTemplate(invoiceTemplateId: number): Promise<InvoiceTemplate | undefined> {
        const deletedInvoiceTemplate = this.invoiceTemplates.find(
            (invoiceTemplate) => invoiceTemplate.id === invoiceTemplateId
        );
        if (deletedInvoiceTemplate) {
            this.invoiceTemplates = this.invoiceTemplates.filter(
                (invoiceTemplate) => invoiceTemplate.id !== deletedInvoiceTemplate.id
            );
        }
        return Promise.resolve(deletedInvoiceTemplate);
    }

    getAllInvoiceTemplates(): Promise<InvoiceTemplate[] | undefined> {
        return Promise.resolve(this.invoiceTemplates);
    }

    getInvoiceTemplateById(invoiceTemplateId: number): Promise<InvoiceTemplate | undefined> {
        return Promise.resolve(
            this.invoiceTemplates.find((invoiceTemplate) => invoiceTemplate.id === invoiceTemplateId)
        );
    }

    updateInvoiceTemplate(
        invoiceTemplateId: number,
        invoiceTemplate: InvoiceTemplate
    ): Promise<InvoiceTemplate | undefined> {
        const updatedInvoiceTemplate = this.invoiceTemplates.find(
            (invoiceTemplate) => invoiceTemplate.id === invoiceTemplateId
        );
        if (updatedInvoiceTemplate) {
            this.invoiceTemplates = this.invoiceTemplates.map((invoiceTemplate) =>
                invoiceTemplate.id === updatedInvoiceTemplate.id ? invoiceTemplate : updatedInvoiceTemplate
            );
            return Promise.resolve(invoiceTemplate);
        }
        return Promise.reject('Invoice Template not found');
    }
}
