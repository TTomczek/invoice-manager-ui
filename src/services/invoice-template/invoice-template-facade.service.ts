import { inject, Injectable, signal } from '@angular/core';
import { InvoiceTemplateService } from './invoice-template.service';
import { InvoiceTemplate } from '../../models/invoice-template.model';
import { FileService } from '../file/file.service';
import { FileWithContent } from '../../models/file-with-content';
import { TranslatableMessageService } from '../translatable-message.service';

@Injectable({
    providedIn: 'root',
})
export class InvoiceTemplateFacade {
    private invoiceTemplateService = inject(InvoiceTemplateService);
    private fileService = inject(FileService);
    private messageService = inject(TranslatableMessageService);

    private readonly invoiceTemplates = signal<InvoiceTemplate[]>([]);
    getInvoiceTemplates = this.invoiceTemplates.asReadonly();

    loadInvoiceTemplates() {
        this.invoiceTemplateService.getAllInvoiceTemplates().then((invoiceTemplates) => {
            if (invoiceTemplates) {
                this.invoiceTemplates.set(invoiceTemplates);
            }
        }).catch((error) => {
            this.messageService.add({ key: 'error.invoiceTemplates.load', severity: 'error' });
            console.error('Error loading invoice templates', error);
        });
    }

    createInvoiceTemplate(invoiceTemplate: InvoiceTemplate) {
        this.invoiceTemplateService.createInvoiceTemplate(invoiceTemplate).then((createdInvoiceTemplate) => {
            if (createdInvoiceTemplate) {
                this.invoiceTemplates.set([...this.getInvoiceTemplates(), createdInvoiceTemplate]);
            }
        }).catch((error) => {
            this.messageService.add({ key: 'error.invoiceTemplate.create', severity: 'error' });
            console.error('Error creating invoice template', error);
        });
    }

    deleteInvoiceTemplate(invoiceTemplateId: number) {
        this.invoiceTemplateService.deleteInvoiceTemplate(invoiceTemplateId).then((deletedInvoiceTemplate) => {
            if (deletedInvoiceTemplate) {
                const invoiceTemplates = this.getInvoiceTemplates();
                const updatedInvoiceTemplates = invoiceTemplates.filter((invoiceTemplate) => invoiceTemplate.id !== invoiceTemplateId);
                this.invoiceTemplates.set(updatedInvoiceTemplates);
            }
        }).catch((error) => {
            this.messageService.add({ key: 'error.invoiceTemplate.delete', severity: 'error' });
            console.error('Error deleting invoice template', error);
        });
    }

    updateInvoiceTemplate(invoiceTemplateId: number, invoiceTemplate: InvoiceTemplate) {
        this.invoiceTemplateService.updateInvoiceTemplate(invoiceTemplateId, invoiceTemplate).then((updatedInvoiceTemplate) => {
            if (updatedInvoiceTemplate) {
                const invoiceTemplates = this.getInvoiceTemplates();
                const updatedInvoiceTemplates = invoiceTemplates.map((invoiceTemplate) => {
                    return invoiceTemplate.id === invoiceTemplateId ? updatedInvoiceTemplate : invoiceTemplate;
                });
                this.invoiceTemplates.set(updatedInvoiceTemplates);
            }
        }).catch((error) => {
            this.messageService.add({ key: 'error.invoiceTemplate.update', severity: 'error' });
            console.error('Error updating invoice template', error);
        });
    }

    getInvoiceTemplateById(invoiceTemplateId: number) {
        return this.invoiceTemplates().find((invoiceTemplate) => invoiceTemplate.id === invoiceTemplateId);
    }

    async uploadBackgroundPdf(file: File): Promise<number> {
        return this.fileService.uploadFile(file);
    }

    downloadBackgroundPdf(fileId: number) {
        this.fileService.downloadFile(fileId).then((fileWithContent: FileWithContent | undefined) => {
            if (!fileWithContent) {
                this.messageService.add({ key: 'error.file.download', severity: 'error' });
                return;
            }
            const binary = atob(fileWithContent.content.replace(/\s/g, ''));
            const len = binary.length;
            const buffer = new ArrayBuffer(len);
            const view = new Uint8Array(buffer);
            for (let i = 0; i < len; i++) {
                view[i] = binary.charCodeAt(i);
            }
            const blob = new Blob([view], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileWithContent.name;
            a.click();
            a.remove();
        });
    }
}
