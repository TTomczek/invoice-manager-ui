import { inject, Injectable } from '@angular/core';
import { InvoicePosition } from '../invoice-position.model';
import { InvoicePositionDTO } from '@invoice-manager/api-typescript-angular-client';
import { UnitConverterService } from './unit-converter.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicePositionConverterService {

  private readonly unitConverter = inject(UnitConverterService);

  toEntity(dto: InvoicePositionDTO | undefined): InvoicePosition | undefined {
    if (!dto) {
      return undefined;
    }
    return {
      id: dto.id,
      description: dto.description ?? '',
      unit: this.unitConverter.toEntity(dto.unit),
      quantity: dto.quantity ?? 0,
      pricePerUnitInCents: dto.pricePerUnitInCents ?? 0,
      invoice: dto.invoice?.toString() ?? ''
    };
  }

  toDTO(entity: InvoicePosition | undefined): InvoicePositionDTO | undefined {
    if (!entity) {
      return undefined;
    }
    return {
      id: entity.id,
      description: entity.description,
      invoice: Number.parseInt(entity.invoice),
      quantity: entity.quantity,
      unit: this.unitConverter.toDTO(entity.unit),
      pricePerUnitInCents: entity.pricePerUnitInCents
    };
  }

}
