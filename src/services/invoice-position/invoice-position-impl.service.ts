import { inject, Injectable } from '@angular/core';
import { InvoicePositionService } from './invoice-position.service';
import { InvoicePosition } from '../../models/invoice-position.model';
import { InvoicePositionsService } from '@invoice-manager/api-typescript-angular-client';
import { InvoicePositionConverterService } from '../../models/converter/invoice-position-converter.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InvoicePositionImplService implements InvoicePositionService {
    private invoicePositionsService: InvoicePositionsService = inject(InvoicePositionsService);
    private invoicePositionConverter: InvoicePositionConverterService = inject(InvoicePositionConverterService);

    async getInvoicePositions(): Promise<InvoicePosition[] | undefined> {
        return lastValueFrom(this.invoicePositionsService.getAllInvoicePositions()).then((invoicePositions) => {
            return invoicePositions
                .map((invoicePosition) => this.invoicePositionConverter.toEntity(invoicePosition))
                .filter((invoicePosition) => invoicePosition !== undefined);
        });
    }

    async createInvoicePosition(invoicePosition: InvoicePosition): Promise<InvoicePosition | undefined> {
        const invoicePositionDTO = this.invoicePositionConverter.toDTO(invoicePosition);
        if (!invoicePositionDTO) {
            return Promise.reject('converter failed');
        }
        return lastValueFrom(this.invoicePositionsService.createPosition(invoicePositionDTO)).then(
            (createdInvoicePosition) => {
                if (!createdInvoicePosition) {
                    return undefined;
                }
                return this.invoicePositionConverter.toEntity(createdInvoicePosition);
            }
        );
    }

    async deleteInvoicePosition(id: number): Promise<InvoicePosition | undefined> {
        return lastValueFrom(this.invoicePositionsService.deleteInvoicePositionById(id)).then((deletedInvoicePosition) => {
            return this.invoicePositionConverter.toEntity(deletedInvoicePosition);
        });
    }

    async getInvoicePositionById(id: number): Promise<InvoicePosition | undefined> {
        return lastValueFrom(this.invoicePositionsService.getInvoicePositionById(id)).then((invoicePosition) => {
            return this.invoicePositionConverter.toEntity(invoicePosition);
        });
    }

    async updateInvoicePosition(id: number, invoicePosition: InvoicePosition): Promise<InvoicePosition | undefined> {
        const invoicePositionDTO = this.invoicePositionConverter.toDTO(invoicePosition);
        if (!invoicePositionDTO) {
            return Promise.reject('converter failed');
        }
        return lastValueFrom(this.invoicePositionsService.updateInvoicePositionById(id, invoicePositionDTO)).then(
            (updatedInvoicePosition) => {
                if (!updatedInvoicePosition) {
                    return undefined;
                }
                return this.invoicePositionConverter.toEntity(updatedInvoicePosition);
            }
        );
    }
}
