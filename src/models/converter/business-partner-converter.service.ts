import { inject, Injectable } from '@angular/core';
import { BusinessPartnerDTO } from '@invoice-manager/api-typescript-angular-client';
import { BusinessPartner } from '../business-partner.model';
import { AddressConverterService } from './address-converter.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessPartnerConverterService {
  private readonly addressConverter = inject(AddressConverterService);

  toEntity(dto: BusinessPartnerDTO | undefined): BusinessPartner | undefined {
    if (!dto) {
      return undefined;
    }
    return {
      id: dto.id,
      name: dto.name ?? '',
      description: dto.description ?? '',
      address: this.addressConverter.toEntity(dto.address),
      contactPersons: dto.contactPersons?.map((cp) => cp.toString()) ?? [],
      invoices: dto.invoices?.map((i) => i.toString()) ?? [],
    };
  }

  toDTO(entity: BusinessPartner | undefined): BusinessPartnerDTO | undefined {
    if (!entity) {
      return undefined;
    }

    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      address: this.addressConverter.toDTO(entity.address),
      contactPersons: entity.contactPersons.map((cp) => parseInt(cp)),
      invoices: entity.invoices.map((i) => parseInt(i)),
    };
  }
}
