import { inject, Injectable } from '@angular/core';
import { InvoiceDTO } from '@invoice-manager/api-typescript-angular-client';
import { Invoice } from '../invoice.model';
import { SalesTaxConverterService } from './sales-tax-converter.service';

@Injectable({
    providedIn: 'root',
})
export class InvoiceConverterService {
    private readonly salesTaxConverter = inject(SalesTaxConverterService);

    toEntity(dto: InvoiceDTO | undefined): Invoice | undefined {
        if (!dto) {
            return undefined;
        }

        return {
            id: dto.id,
            description: dto.description ?? '',
            file: dto.file,
            customer: dto.customerNumber,
            receiver: dto.receiver,
            perMail: dto.viaMail ?? false,
            preText: dto.preText ?? '',
            postText: dto.postText ?? '',
            invoiceTemplate: dto.invoiceTemplate,
            serviceProvidedFrom: dto.serviceFrom ?? '',
            serviceProvidedTo: dto.serviceTo ?? '',
            salesTax: dto.salesTax,
            orderNumber: dto.orderNumber ?? '',
            invoicePositions: dto.positions?.map((ip) => ip) ?? [],
            paid: dto.paid ?? false,
        };
    }

    toDTO(entity: Invoice | undefined): InvoiceDTO | undefined {
        if (!entity) {
            return undefined;
        }

        return {
            id: entity.id,
            description: entity.description,
            viaMail: entity.perMail,
            preText: entity.preText,
            postText: entity.postText,
            serviceFrom: entity.serviceProvidedFrom,
            serviceTo: entity.serviceProvidedTo,
            orderNumber: entity.orderNumber,
            file: entity.file,
            receiver: entity.receiver,
            salesTax: entity.salesTax,
            positions: entity.invoicePositions.map((ip) => ip),
            invoiceTemplate: entity.invoiceTemplate,
            customerNumber: entity.customer,
            paid: entity.paid,
        };
    }
}
