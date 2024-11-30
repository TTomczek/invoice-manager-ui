import { SalesTax } from '../../models/sales-tax.model';

export abstract class SalesTaxService {
  public abstract createSalesTax(salesTax: SalesTax): Promise<SalesTax | undefined>;

  public abstract deleteSalesTax(salesTaxId: number): Promise<SalesTax | undefined>;

  public abstract getAllSalesTaxes(): Promise<SalesTax[] | undefined>;

  public abstract getSalesTaxById(salesTaxId: number): Promise<SalesTax | undefined>;

  public abstract updateSalesTax(salesTaxId: number, salesTax: SalesTax): Promise<SalesTax | undefined>;
}
