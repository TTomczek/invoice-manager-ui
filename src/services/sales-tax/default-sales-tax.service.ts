import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { SalesTaxService } from './sales-tax.service';
import { SalesTax } from '../../models/sales-tax.model';

@Injectable({
  providedIn: 'root',
})
export class DefaultSalesTaxService implements SalesTaxService {
  private readonly taxes: WritableSignal<SalesTax[]> = signal([]);

  constructor() {
    this.taxes.set([
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
    ]);
  }

  getAllSalesTaxes(): Signal<SalesTax[] | undefined> {
    return this.taxes.asReadonly();
  }

  createSalesTax(salesTax: SalesTax): Signal<SalesTax | undefined> {
    this.taxes.set([...this.taxes(), salesTax]);
    return signal(salesTax);
  }

  deleteSalesTax(salesTaxId: number): Signal<SalesTax | undefined> {
    const deletedSalesTax = this.taxes().find(
      (tax) => tax.id === salesTaxId
    );
    if (deletedSalesTax) {
      this.taxes.set(
        this.taxes().filter((tax) => tax.id !== salesTaxId)
      );
    }
    return signal(deletedSalesTax);
  }

  getSalesTaxById(salesTaxId: number): Signal<SalesTax | undefined> {
    return signal(this.taxes().find((tax) => tax.id === salesTaxId));
  }

  updateSalesTax(salesTaxId: number, salesTax: SalesTax): Signal<SalesTax | undefined> {
    const updatedSalesTax = this.taxes().find(
      (tax) => tax.id === salesTaxId
    );
    if (updatedSalesTax) {
      this.taxes.set(
        this.taxes().map((tax) =>
          tax.id === salesTaxId ? salesTax : tax
        )
      );
    }
    return signal(salesTax);
  }
}
