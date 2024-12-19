import { inject, Injectable, signal } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { TranslatableMessageService } from '../translatable-message.service';
import { Invoice } from '../../models/invoice.model';
import { FileWithContent } from '../../models/file-with-content';
import { FileService } from '../file/file.service';

@Injectable({
    providedIn: 'root'
})
export class InvoiceFacade {
    private invoiceService = inject(InvoiceService);
    private messageService = inject(TranslatableMessageService);
    private fileService = inject(FileService);

    private readonly invoices = signal<Invoice[]>([]);
    getInvoices = this.invoices.asReadonly();

    loadInvoices(): void {
        this.invoiceService.getInvoices().then(invoices => {
            if (invoices) {
                this.invoices.set(invoices);
            }
        }).catch((error) => {
            this.messageService.add({ key: 'invoices.load-error', severity: 'error' });
            console.error('Invoices load error', error);
        });
    }

    createInvoice(invoice: Invoice): void {
        this.invoiceService.createInvoice(invoice).then(createdInvoice => {
            if (createdInvoice) {
                this.invoices.set([...this.getInvoices(), createdInvoice]);
            }
        }).catch((error) => {
            this.messageService.add({ key: 'invoices.create-error', severity: 'error' });
            console.error('Invoice created error', error);
        });
    }

    deleteInvoice(invoiceId: number): void {
        this.invoiceService.deleteInvoice(invoiceId).then(deletedInvoice => {
            if (deletedInvoice) {
                this.invoices.set(this.getInvoices().filter(invoice => invoice.id !== deletedInvoice.id));
            }
        }).catch((error) => {
            this.messageService.add({ key: 'invoices.delete-error', severity: 'error' });
            console.error('Invoice deleted error', error);
        });
    }

    updateInvoice(invoiceId: number, invoice: Invoice): void {
        this.invoiceService.updateInvoice(invoiceId, invoice).then(updatedInvoice => {
            if (updatedInvoice) {
                this.invoices.set(this.getInvoices().map(invoice => invoice.id === updatedInvoice.id ? updatedInvoice : invoice));
            }
        }).catch((error) => {
            this.messageService.add({ key: 'invoices.update-error', severity: 'error' });
            console.error('Invoice updated error', error);
        });
    }

    getInvoiceById(invoiceId: number): Invoice | undefined {
        // Hier ist das == gewollt, da hier invoiceId ein string sein kann. Ich weiß nicht warum.
        return this.getInvoices().find(invoice => invoice.id == invoiceId);
    }

    async generateInvoicePdf(invoiceId: number): Promise<void> {
        const fileId = await this.invoiceService.generateInvoicePdfById(invoiceId);
        if (fileId) {
            this.fileService.downloadFile(fileId).then((fileWithContent: FileWithContent | undefined) => {
                if (fileWithContent) {
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
                }
            }).catch((error: any) => {
                this.messageService.add({ key: 'invoices.generate-pdf-error', severity: 'error' });
                console.error('Invoice pdf generation error', error);
            });
        }

    }
}
