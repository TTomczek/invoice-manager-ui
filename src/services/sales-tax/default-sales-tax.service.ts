import { Injectable } from '@angular/core';
import { SalesTaxService } from './sales-tax.service';
import { SalesTax } from '../../models/sales-tax.model';

@Injectable({
    providedIn: 'root',
})
export class DefaultSalesTaxService implements SalesTaxService {
    private taxes: SalesTax[] = [];

    constructor() {
        this.taxes.push(
            {
                id: 1,
                name: 'VAT',
                rate: 0.19,
            },
            {
                id: 2,
                name: 'GST',
                rate: 0.05,
            },
            {
                id: 3,
                name: 'Sales Tax',
                rate: 0.07,
            },
            {
                id: 4,
                name: 'Local Tax',
                rate: 0.03,
            },
            {
                id: 5,
                name: 'State Tax',
                rate: 0.05,
            },
            {
                id: 6,
                name: 'Federal Tax',
                rate: 0.1,
            }
        );
    }

    getAllSalesTaxes(): Promise<SalesTax[] | undefined> {
        return Promise.resolve(this.taxes);
    }

    createSalesTax(salesTax: SalesTax): Promise<SalesTax | undefined> {
        salesTax.id = this.taxes.length + Math.random() + 10;
        this.taxes.push(salesTax);
        return Promise.resolve(salesTax);
    }

    deleteSalesTax(salesTaxId: number): Promise<SalesTax | undefined> {
        const deletedSalesTax = this.taxes.find((tax) => tax.id === salesTaxId);
        if (deletedSalesTax) {
            this.taxes = this.taxes.filter((tax) => tax.id !== salesTaxId);
        }
        return Promise.resolve(deletedSalesTax);
    }

    getSalesTaxById(salesTaxId: number): Promise<SalesTax | undefined> {
        return Promise.resolve(this.taxes.find((tax) => tax.id === salesTaxId));
    }

    updateSalesTax(salesTaxId: number, salesTax: SalesTax): Promise<SalesTax | undefined> {
        const updatedSalesTax = this.taxes.find((tax) => tax.id === salesTaxId);
        if (updatedSalesTax) {
            this.taxes = this.taxes.map((tax) => (tax.id === salesTaxId ? salesTax : tax));
            return Promise.resolve(salesTax);
        }
        return Promise.reject('Sales Tax not found');
    }
}
