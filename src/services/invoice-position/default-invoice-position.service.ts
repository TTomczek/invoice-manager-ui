import { Injectable } from '@angular/core';
import { InvoicePositionService } from './invoice-position.service';
import { InvoicePosition } from '../../models/invoice-position.model';
import { Unit } from '../../models/unit';

@Injectable({
    providedIn: 'root'
})
export class DefaultInvoicePositionService implements InvoicePositionService {
    private invoicePositions: InvoicePosition[] = [];
    private nextId = 3;

    constructor() {
        this.invoicePositions = [
            {
                id: 1,
                description: 'Test description',
                quantity: 1,
                pricePerUnitInCents: 100,
                unit: Unit.PIECE,
                invoice: 2
            },
            {
                id: 2,
                description: 'Test description 2',
                quantity: 2,
                pricePerUnitInCents: 200,
                unit: Unit.PIECE,
                invoice: 1
            }
        ];
    }

    createInvoicePosition(contactPerson: InvoicePosition): Promise<InvoicePosition | undefined> {
        contactPerson.id = this.nextId;
        this.nextId++;
        this.invoicePositions.push(contactPerson);
        return Promise.resolve(contactPerson);
    }

    deleteInvoicePosition(id: number): Promise<InvoicePosition | undefined> {
        const deletedInvoicePosition = this.invoicePositions.find((invoicePosition) => invoicePosition.id === id);
        if (deletedInvoicePosition) {
            this.invoicePositions = this.invoicePositions.filter((invoicePosition) => invoicePosition.id !== id);
        }
        return Promise.resolve(deletedInvoicePosition);
    }

    getInvoicePositionById(id: number): Promise<InvoicePosition | undefined> {
        return Promise.resolve(this.invoicePositions.find((invoicePosition) => invoicePosition.id === id));
    }

    getInvoicePositions(): Promise<InvoicePosition[] | undefined> {
        return Promise.resolve([...this.invoicePositions]);
    }

    updateInvoicePosition(id: number, invoicePosition: InvoicePosition): Promise<InvoicePosition | undefined> {
        const updatedInvoicePosition = this.invoicePositions.find((invoicePosition) => invoicePosition.id === id);
        if (updatedInvoicePosition) {
            this.invoicePositions = this.invoicePositions.map((position) => position.id === id ? invoicePosition : position);
            return Promise.resolve(invoicePosition);
        }
        return Promise.reject('Invoice position not found');
    }


}
