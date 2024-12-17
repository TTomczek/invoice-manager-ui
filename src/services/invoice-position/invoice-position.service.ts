import { InvoicePosition } from '../../models/invoice-position.model';

export abstract class InvoicePositionService {
    abstract getInvoicePositions(): Promise<InvoicePosition[] | undefined>;
    abstract getInvoicePositionById(id: number): Promise<InvoicePosition | undefined>;
    abstract createInvoicePosition(contactPerson: InvoicePosition): Promise<InvoicePosition | undefined>;
    abstract updateInvoicePosition(id: number, contactPerson: InvoicePosition): Promise<InvoicePosition | undefined>;
    abstract deleteInvoicePosition(id: number): Promise<InvoicePosition | undefined>;
}
