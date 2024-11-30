import { inject, Injectable, signal } from '@angular/core';
import { SalesTax } from '../../models/sales-tax.model';
import { SalesTaxService } from './sales-tax.service';
import { TranslatableMessageService } from '../translatable-message.service';

@Injectable({
  providedIn: 'root'
})
export class SalesTaxFacade {
  private salesTaxService = inject(SalesTaxService);
  private messageService = inject(TranslatableMessageService);

  private readonly salesTaxes = signal<SalesTax[]>([]);
  getSalesTaxes = this.salesTaxes.asReadonly();

  loadSalesTaxes() {
    this.salesTaxService.getAllSalesTaxes().then(salesTaxes => {
        if (salesTaxes) {
            this.salesTaxes.set(salesTaxes);
        }
    }).catch((error) => {
        this.messageService.add({ key: 'sales-taxes.load-error', severity: 'error' });
        console.error('Sales taxes load error', error);
    });
  }

  createSalesTax(salesTax: SalesTax) {
    this.salesTaxService.createSalesTax(salesTax).then(createdSalesTax => {
        if (createdSalesTax) {
            this.salesTaxes.set([...this.getSalesTaxes(), createdSalesTax]);
        }
    }).catch((error) => {
        this.messageService.add({ key: 'sales-taxes.create-error', severity: 'error' });
        console.error('Sales tax created error', error);
    });
  }

  deleteSalesTax(salesTaxId: number) {
    this.salesTaxService.deleteSalesTax(salesTaxId).then(deletedSalesTax => {
        if (deletedSalesTax) {
            this.salesTaxes.set(this.getSalesTaxes().filter(salesTax => salesTax.id !== deletedSalesTax.id));
        }
    }).catch((error) => {
        this.messageService.add({ key: 'sales-taxes.delete-error', severity: 'error' });
        console.error('Sales tax deleted error', error);
    });
  }

  updateSalesTax(salesTaxId: number, salesTax: SalesTax) {
    this.salesTaxService.updateSalesTax(salesTaxId, salesTax).then(updatedSalesTax => {
        if (updatedSalesTax) {
            this.salesTaxes.set(this.getSalesTaxes().map(salesTax => salesTax.id === updatedSalesTax.id ? updatedSalesTax : salesTax));
        }
    }).catch((error) => {
        this.messageService.add({ key: 'sales-taxes.update-error', severity: 'error' });
        console.error('Sales tax updated error', error);
    });
  }

  getSalesTaxById(salesTaxId: number) {
    return this.salesTaxes().find(salesTax => salesTax.id === salesTaxId);
  }
}
