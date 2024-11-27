import { inject, Injectable, signal } from '@angular/core';
import { SalesTax } from '../../models/sales-tax.model';
import { SalesTaxService } from './sales-tax.service';

@Injectable({
  providedIn: 'root'
})
export class SalesTaxFacade {
  private salesTaxService = inject(SalesTaxService);

  private readonly salesTaxes = signal<SalesTax[]>([]);

  getSalesTaxes = this.salesTaxes.asReadonly();

  loadSalesTaxes() {
    const salesTaxes = this.salesTaxService.getAllSalesTaxes()();
    if (salesTaxes) {
      this.salesTaxes.set(salesTaxes);
    } else {
      this.salesTaxes.set([]);
    }
  }

  createSalesTax(salesTax: SalesTax) {
    const createdSalesTaxSignal = this.salesTaxService.createSalesTax(salesTax);
    const createdSalesTax = createdSalesTaxSignal();
    if (createdSalesTax) {
      this.salesTaxes.set([...this.getSalesTaxes(), createdSalesTax]);
    }
  }

  deleteSalesTax(salesTaxId: number) {
    const deletedSalesTaxSignal = this.salesTaxService.deleteSalesTax(salesTaxId);
    const deletedSalesTax = deletedSalesTaxSignal();
    if (deletedSalesTax) {
      this.salesTaxes.set(this.getSalesTaxes().filter(salesTax => salesTax.id !== deletedSalesTax.id));
    }
  }

  updateSalesTax(salesTaxId: number, salesTax: SalesTax) {
    const updatedSalesTaxSignal = this.salesTaxService.updateSalesTax(salesTaxId, salesTax);
    const updatedSalesTax = updatedSalesTaxSignal();
    if (updatedSalesTax) {
      const salesTaxes = this.getSalesTaxes();
      const updatedSalesTaxes = salesTaxes.map(salesTax => salesTax.id === updatedSalesTax.id ? updatedSalesTax : salesTax);
      this.salesTaxes.set(updatedSalesTaxes);
    }
  }

  getSalesTaxById(salesTaxId: number) {
    return this.salesTaxService.getSalesTaxById(salesTaxId)();
  }
}
