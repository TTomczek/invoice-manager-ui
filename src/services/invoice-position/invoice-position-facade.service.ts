import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { InvoicePositionService } from './invoice-position.service';
import { TranslatableMessageService } from '../translatable-message.service';
import { InvoicePosition } from '../../models/invoice-position.model';
import { InvoiceService } from '../invoice/invoice.service';

@Injectable({
    providedIn: 'root'
})
export class InvoicePositionFacade {
    private invoiceService: InvoiceService = inject(InvoiceService);
    private invoicePositionService: InvoicePositionService = inject(InvoicePositionService);
    private messageService: TranslatableMessageService = inject(TranslatableMessageService);

    private readonly invoicePositions: WritableSignal<InvoicePosition[]> = signal([]);
    public getInvoicePositions = this.invoicePositions.asReadonly();

    loadInvoicePositions(invoiceId: number): void {
        this.invoiceService.getInvoicePositionsOfInvoice(invoiceId).then((invoicePositions) => {
            if (invoicePositions) {
                this.invoicePositions.set(invoicePositions);
            }
        }).catch((error) => {
            this.messageService.add({ summary: 'invoice-positions.load-error', severity: 'error' });
            console.error('Invoice positions load error', error);
        });
    }

    createInvoicePosition(invoicePosition: InvoicePosition): void {
        this.invoicePositionService.createInvoicePosition(invoicePosition).then((createdInvoicePosition) => {
            if (createdInvoicePosition) {
                this.invoicePositions.set([...this.getInvoicePositions(), createdInvoicePosition]);
            }
        });
    }

    deleteInvoicePosition(invoicePositionId: number): void {
        this.invoicePositionService.deleteInvoicePosition(invoicePositionId).then((deletedInvoicePosition) => {
            if (deletedInvoicePosition) {
                this.invoicePositions.set(this.getInvoicePositions().filter((invoicePosition) => invoicePosition.id !== deletedInvoicePosition.id));
            }
        });
    }

    updateInvoicePosition(invoicePositionId: number, invoicePosition: InvoicePosition): void {
        this.invoicePositionService.updateInvoicePosition(invoicePositionId, invoicePosition).then((updatedInvoicePosition) => {
            if (updatedInvoicePosition) {
                this.invoicePositions.set(this.getInvoicePositions().map((invoicePosition) => invoicePosition.id === updatedInvoicePosition.id ? updatedInvoicePosition : invoicePosition));
            }
        });
    }

    getInvoicePositionById(invoicePositionId: number): InvoicePosition | undefined {
        return this.getInvoicePositions().find((invoicePosition) => invoicePosition.id === invoicePositionId);
    }
}
