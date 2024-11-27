import { Injectable } from '@angular/core';
import { SalesTaxDTO } from '@invoice-manager/api-typescript-angular-client';
import { SalesTax } from '../sales-tax.model';

@Injectable({
  providedIn: 'root'
})
export class SalesTaxConverterService {

  toEntity(dto: SalesTaxDTO | undefined): SalesTax | undefined {
    if (!dto) {
      return undefined;
    }
    return {
      id: dto.id,
      name: dto.name ?? '',
      rate: dto.rate ?? 0
    };
  }

  toDTO(entity: SalesTax | undefined): SalesTaxDTO | undefined {
    if (!entity) {
      return undefined;
    }
    return {
      id: entity.id,
      name: entity.name,
      rate: entity.rate
    };
  }

}
