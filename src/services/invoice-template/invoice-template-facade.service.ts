import { inject, Injectable, signal } from '@angular/core';
import { InvoiceTemplateService } from './invoice-template.service';
import { InvoiceTemplate } from '../../models/invoice-template.model';
import { FileService } from '../file/file.service';
import { FileWithContent } from '../../models/file-with-content';

@Injectable({
    providedIn: 'root',
})
export class InvoiceTemplateFacade {
    private invoiceTemplateService = inject(InvoiceTemplateService);
    private fileService = inject(FileService);

    private readonly invoiceTemplates = signal<InvoiceTemplate[]>([]);
    getInvoiceTemplates = this.invoiceTemplates.asReadonly();

    loadInvoiceTemplates() {
        const invoiceTemplates = this.invoiceTemplateService.getAllInvoiceTemplates()();
        if (invoiceTemplates) {
            this.invoiceTemplates.set(invoiceTemplates);
        } else {
            this.invoiceTemplates.set([]);
        }
    }

    createInvoiceTemplate(invoiceTemplate: InvoiceTemplate) {
        const createdInvoiceTemplateSignal = this.invoiceTemplateService.createInvoiceTemplate(invoiceTemplate);
        const createdInvoiceTemplate = createdInvoiceTemplateSignal();
        if (createdInvoiceTemplate) {
            this.invoiceTemplates.set([...this.getInvoiceTemplates(), createdInvoiceTemplate]);
        }
    }

    deleteInvoiceTemplate(invoiceTemplateId: number) {
        const deletedInvoiceTemplateSignal = this.invoiceTemplateService.deleteInvoiceTemplate(invoiceTemplateId);
        const deletedInvoiceTemplate = deletedInvoiceTemplateSignal();
        if (deletedInvoiceTemplate) {
            this.invoiceTemplates.set(
                this.getInvoiceTemplates().filter((invoiceTemplate) => invoiceTemplate.id !== deletedInvoiceTemplate.id)
            );
        }
    }

    updateInvoiceTemplate(invoiceTemplateId: number, invoiceTemplate: InvoiceTemplate) {
        const updatedInvoiceTemplateSignal = this.invoiceTemplateService.updateInvoiceTemplate(
            invoiceTemplateId,
            invoiceTemplate
        );
        const updatedInvoiceTemplate = updatedInvoiceTemplateSignal();
        if (updatedInvoiceTemplate) {
            const invoiceTemplates = this.getInvoiceTemplates();
            const updatedInvoiceTemplates = invoiceTemplates.map((invoiceTemplate) =>
                invoiceTemplate.id === updatedInvoiceTemplate.id ? updatedInvoiceTemplate : invoiceTemplate
            );
            this.invoiceTemplates.set(updatedInvoiceTemplates);
        }
    }

    getInvoiceTemplateById(invoiceTemplateId: number) {
        return this.invoiceTemplateService.getInvoiceTemplateById(invoiceTemplateId)();
    }

    uploadBackgroundPdf(file: File): Promise<number> {
        return this.fileService.uploadFile(file);
    }

    downloadBackgroundPdf(fileId: number): Promise<FileWithContent | undefined> {
        return this.fileService.downloadFile(fileId);
    }
}
