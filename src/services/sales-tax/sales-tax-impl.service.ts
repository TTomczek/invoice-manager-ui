import { inject, Injectable } from '@angular/core';
import { SalesTaxService } from './sales-tax.service';
import { SalesTaxesService } from '@invoice-manager/api-typescript-angular-client';
import { SalesTax } from '../../models/sales-tax.model';
import { SalesTaxConverterService } from '../../models/converter/sales-tax-converter.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SalesTaxImplService implements SalesTaxService {
    private salesTaxApi = inject(SalesTaxesService);
    private salesTaxConverter = inject(SalesTaxConverterService);

    public async createSalesTax(salesTax: SalesTax): Promise<SalesTax | undefined> {
        const salesTaxDto = this.salesTaxConverter.toDTO(salesTax);
        if (!salesTaxDto) {
            return Promise.reject('converter failed');
        }
        return lastValueFrom(this.salesTaxApi.createSalesTax(salesTaxDto))
            .then((createdSalesTaxDto) => {
                if (!createdSalesTaxDto) {
                    return undefined;
                }
                return this.salesTaxConverter.toEntity(createdSalesTaxDto);
            });
    }

    public async deleteSalesTax(salesTaxId: number): Promise<SalesTax | undefined> {
        return lastValueFrom(this.salesTaxApi.deleteSalesTaxById(salesTaxId)).then((deletedSalesTaxDto) => {
          return this.salesTaxConverter.toEntity(deletedSalesTaxDto);
        });
    }

    public async getAllSalesTaxes(): Promise<SalesTax[] | undefined> {
        return lastValueFrom(this.salesTaxApi.getAllSalesTaxes()).then((salesTaxDtos) => {
            return salesTaxDtos.map((salesTaxDto) => {
                return this.salesTaxConverter.toEntity(salesTaxDto);
            }).filter((salesTax) => salesTax !== undefined);
        });
    }

    public async getSalesTaxById(salesTaxId: number) {
        return lastValueFrom(this.salesTaxApi.getSalesTaxById(salesTaxId)).then((salesTaxDto) => {
            return this.salesTaxConverter.toEntity(salesTaxDto);
        });
    }

    public async updateSalesTax(salesTaxId: number, salesTax: SalesTax): Promise<SalesTax | undefined> {
        const salesTaxDto = this.salesTaxConverter.toDTO(salesTax);
        if (!salesTaxDto) {
            return Promise.reject('converter failed');
        }
        return lastValueFrom(this.salesTaxApi.updateSalesTaxById(salesTaxId, salesTaxDto))
            .then((updatedSalesTaxDto) => {
                if (!updatedSalesTaxDto) {
                    return undefined;
                }
                return this.salesTaxConverter.toEntity(updatedSalesTaxDto);
            });
    }
}
