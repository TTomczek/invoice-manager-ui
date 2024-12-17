import { inject, Injectable } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { InvoicesService } from '@invoice-manager/api-typescript-angular-client';
import { InvoiceConverterService } from '../../models/converter/invoice-converter.service';
import { InvoicePositionConverterService } from '../../models/converter/invoice-position-converter.service';
import { lastValueFrom } from 'rxjs';
import { Invoice } from '../../models/invoice.model';
import { InvoicePosition } from '../../models/invoice-position.model';

@Injectable({
    providedIn: 'root'
})
export class InvoiceImplService implements InvoiceService {
    private invoicesService: InvoicesService = inject(InvoicesService);
    private invoiceConverter: InvoiceConverterService = inject(InvoiceConverterService);
    private invoicePositionConverter: InvoicePositionConverterService = inject(InvoicePositionConverterService);

    public async createInvoice(invoice: Invoice): Promise<Invoice | undefined> {
        const invoiceDto = this.invoiceConverter.toDTO(invoice);
        if (!invoiceDto) {
            return Promise.reject('converter failed');
        }
        return lastValueFrom(this.invoicesService.createInvoice(invoiceDto)).then(
            (createdInvoiceDto) => {
                if (!createdInvoiceDto) {
                    return undefined;
                }
                return this.invoiceConverter.toEntity(createdInvoiceDto);
            }
        );
    }

    public async deleteInvoice(invoiceId: number): Promise<Invoice | undefined> {
        return lastValueFrom(this.invoicesService.deleteInvoiceById(invoiceId)).then(
            (deletedInvoiceDto) => {
                return this.invoiceConverter.toEntity(deletedInvoiceDto);
            }
        );
    }

    public async getInvoices(): Promise<Invoice[] | undefined> {
        return lastValueFrom(this.invoicesService.getAllInvoices()).then((invoiceDtos) => {
            return invoiceDtos
                .map((invoiceDto) => {
                    return this.invoiceConverter.toEntity(invoiceDto);
                })
                .filter((invoice) => invoice !== undefined);
        });
    }

    public async getInvoiceById(invoiceId: number): Promise<Invoice | undefined> {
        return lastValueFrom(this.invoicesService.getInvoiceById(invoiceId)).then(
            (invoiceDto) => {
                return this.invoiceConverter.toEntity(invoiceDto);
            }
        );
    }

    public async updateInvoice(invoiceId: number, invoice: Invoice): Promise<Invoice | undefined> {
        const invoiceDto = this.invoiceConverter.toDTO(invoice);
        if (!invoiceDto) {
            return Promise.reject('converter failed');
        }
        return lastValueFrom(this.invoicesService.updateInvoiceById(invoiceId, invoiceDto)).then((updatedInvoiceDto) => {
                if (!updatedInvoiceDto) {
                    return undefined;
                }
                return this.invoiceConverter.toEntity(updatedInvoiceDto);
            }
        );
    }

    public async getInvoicePositionsOfInvoice(invoiceId: number): Promise<InvoicePosition[] | undefined> {
        return lastValueFrom(this.invoicesService.getAllPositionsOfInvoice(invoiceId)).then(
            (invoicePositions) => {
                return invoicePositions
                    .map((invoicePosition) => this.invoicePositionConverter.toEntity(invoicePosition))
                    .filter((invoicePosition) => invoicePosition !== undefined);
            }
        );
    }
}
