import { inject, Injectable, signal } from '@angular/core';
import { SalesTaxService } from './sales-tax.service';
import { SalesTaxesService } from '@invoice-manager/api-typescript-angular-client';
import { toSignal } from '@angular/core/rxjs-interop';
import { SalesTax } from '../../models/sales-tax.model';
import { SalesTaxConverterService } from '../../models/converter/sales-tax-converter.service';

@Injectable({
  providedIn: 'root'
})
export class SalesTaxImplService implements SalesTaxService {

  private salesTaxApi = inject(SalesTaxesService);
  private salesTaxConverter = inject(SalesTaxConverterService);

  public createSalesTax(salesTax: SalesTax) {
    const salesTaxDto = this.salesTaxConverter.toDTO(salesTax);
    if (!salesTaxDto) {
      return signal(undefined);
    }
    const createdSalesTaxDto = toSignal(this.salesTaxApi.createSalesTax(salesTaxDto))();
    const createdSalesTax = this.salesTaxConverter.toEntity(createdSalesTaxDto);
    return signal(createdSalesTax);
  }

  public deleteSalesTax(salesTaxId: number) {
    const deletedSalesTaxDto = toSignal(this.salesTaxApi.deleteSalesTaxById(salesTaxId))();
    if (!deletedSalesTaxDto) {
      return signal(undefined);
    }
    const deletedSalesTax = this.salesTaxConverter.toEntity(deletedSalesTaxDto);

    return signal(deletedSalesTax);
  }

  public getAllSalesTaxes() {
    const salesTaxDtos = toSignal(this.salesTaxApi.getAllSalesTaxes())();
    if (!salesTaxDtos) {
      return signal([]);
    }
    const salesTaxes: SalesTax[] | undefined = [];
    salesTaxDtos.forEach(salesTaxDto => {
      const salesTax = this.salesTaxConverter.toEntity(salesTaxDto);
      if (salesTax) {
        salesTaxes.push(salesTax);
      }
    });
    return signal(salesTaxes);
  }

  public getSalesTaxById(salesTaxId: number) {
    const salesTaxDto = toSignal(this.salesTaxApi.getSalesTaxById(salesTaxId))();
    if (!salesTaxDto) {
      return signal(undefined);
    }

    const salesTax = this.salesTaxConverter.toEntity(salesTaxDto);
    return signal(salesTax);
  }

  public updateSalesTax(salesTaxId: number, salesTax: SalesTax) {
    const salesTaxDto = this.salesTaxConverter.toDTO(salesTax);
    if (!salesTaxDto) {
      return signal(undefined);
    }
    const updatedSalesTaxDto = toSignal(this.salesTaxApi.updateSalesTaxById(salesTaxId, salesTaxDto))();
    const updatedSalesTax = this.salesTaxConverter.toEntity(updatedSalesTaxDto);
    return signal(updatedSalesTax);
  }
}
