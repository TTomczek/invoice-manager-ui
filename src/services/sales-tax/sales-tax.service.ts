import { Signal } from '@angular/core';
import { SalesTax } from '../../models/sales-tax.model';

export abstract class SalesTaxService {
  public abstract createSalesTax(salesTax: SalesTax): Signal<SalesTax | undefined>;

  public abstract deleteSalesTax(salesTaxId: number): Signal<SalesTax | undefined>;

  public abstract getAllSalesTaxes(): Signal<SalesTax[] | undefined>;

  public abstract getSalesTaxById(salesTaxId: number): Signal<SalesTax | undefined>;

  public abstract updateSalesTax(salesTaxId: number, salesTax: SalesTax): Signal<SalesTax | undefined>;
}
