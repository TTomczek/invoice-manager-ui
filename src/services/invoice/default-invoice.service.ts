import { inject, Injectable } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { Invoice } from '../../models/invoice.model';
import { InvoicePosition } from '../../models/invoice-position.model';
import { DefaultInvoicePositionService } from '../invoice-position/default-invoice-position.service';

@Injectable({
    providedIn: 'root'
})
export class DefaultInvoiceService implements InvoiceService{
    private invoicePositionService: DefaultInvoicePositionService = inject(DefaultInvoicePositionService);
    private invoices: Invoice[] = [];
    private nextId = 3;

    constructor() {
        const invoices: Invoice[] = [
            {
                id: 1,
                description: 'Neue Heizung',
                perMail: false,
                preText: 'Herzlichen Dank für Ihren Auftrag. Wir freuen uns, Ihnen die Rechnung für die erbrachten Leistungen zu senden.',
                postText: 'Wir danken Ihnen für Ihren Auftrag und freuen uns auf eine weiterhin gute Zusammenarbeit.',
                serviceProvidedFrom: new Date('2021-01-01'),
                serviceProvidedTo: new Date('2021-01-31'),
                orderNumber: '12345',
                file: undefined,
                salesTax: 1,
                invoicePositions: [],
                receiver: 1,
                invoiceTemplate: 1,
                customer: 1,
                paid: false,
            },
            {
                id: 2,
                description: 'Neue Solaranlage',
                perMail: true,
                preText: 'Herzlichen Dank für Ihren Auftrag. Wir freuen uns, Ihnen die Rechnung für die erbrachten Leistungen zu senden.',
                postText: 'Wir danken Ihnen für Ihren Auftrag und freuen uns auf eine weiterhin gute Zusammenarbeit.',
                serviceProvidedFrom: new Date('2023-01-01'),
                serviceProvidedTo: new Date('2023-01-31'),
                orderNumber: '567345',
                file: 1,
                salesTax: 1,
                invoicePositions: [1],
                receiver: undefined,
                invoiceTemplate: 1,
                customer: 2,
                paid: true,
            }
        ];
        this.invoices.push(...invoices);
    }

    createInvoice(invoice: Invoice): Promise<Invoice | undefined> {
        invoice.id = this.nextId;
        this.nextId += 1;
        this.invoices.push(invoice);
        return Promise.resolve(invoice);
    }

    deleteInvoice(id: number): Promise<Invoice | undefined> {
        const deletedInvoice = this.invoices.find((invoice) => invoice.id === id);
        if (deletedInvoice) {
            this.invoices = this.invoices.filter((invoice) => invoice.id !==id);
        }
        return Promise.resolve(deletedInvoice);
    }

    getInvoiceById(id: number): Promise<Invoice | undefined> {
        return Promise.resolve(this.invoices.find((invoice) => invoice.id === id));
    }

    getInvoices(): Promise<Invoice[] | undefined> {
        return Promise.resolve([...this.invoices]);
    }

    updateInvoice(invoiceId: number, invoice:Invoice): Promise<Invoice | undefined> {
        const updatedInvoice = this.invoices.find((inv) => inv.id === invoice.id);
        if (updatedInvoice) {
            this.invoices = this.invoices.map((inv) => inv.id === invoiceId ? invoice : inv);
            return Promise.resolve(invoice);
        }
        return Promise.reject('Invoice not found');
    }

    async getInvoicePositionsOfInvoice(invoiceId: number): Promise<InvoicePosition[] | undefined> {
        const invoicePositions = await this.invoicePositionService.getInvoicePositions();
        if (!invoicePositions) {
            return undefined;
        }
        return invoicePositions.filter((invoicePosition) => invoicePosition.invoice == invoiceId);
    }

    generateInvoicePdfById(invoiceId: number): Promise<number> {
        if (invoiceId === 1) {
            return Promise.resolve(1);
        } else {
            return Promise.reject('Invoice not found');
        }
    }


}
