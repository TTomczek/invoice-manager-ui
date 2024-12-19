import { Invoice } from '../../models/invoice.model';
import { InvoicePosition } from '../../models/invoice-position.model';

export abstract class InvoiceService {
    abstract getInvoices(): Promise<Invoice[] | undefined>;
    abstract getInvoiceById(id: number): Promise<Invoice | undefined>;
    abstract createInvoice(invoice: Invoice): Promise<Invoice | undefined>;
    abstract updateInvoice(invoiceId: number, invoice: Invoice): Promise<Invoice | undefined>;
    abstract deleteInvoice(id: number): Promise<Invoice | undefined>;
    abstract getInvoicePositionsOfInvoice(invoiceId: number): Promise<InvoicePosition[] | undefined>;
    abstract generateInvoicePdfById(invoiceId: number): Promise<number>;
}
