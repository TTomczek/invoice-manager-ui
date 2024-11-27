import { inject, Injectable } from '@angular/core';
import { BusinessPartnerDTO } from '@invoice-manager/api-typescript-angular-client';
import { BusinessPartner } from '../business-partner.model';
import { DataStoreService } from '../../services/data-store.service';
import { AddressConverterService } from './address-converter.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessPartnerConverterService {
  private readonly dataStore = inject(DataStoreService);
  private readonly addressConverter = inject(AddressConverterService);

  toEntity(dto: BusinessPartnerDTO | undefined): BusinessPartner | undefined {
    if (!dto) {
      return undefined;
    }
    return {
      id: dto.id,
      name: dto.name ?? '',
      description: dto.description ?? '',
      address: dto.address?.id?.toString(10) ?? '',
      contactPersons: dto.contactPersons?.map((cp) => cp.toString()) ?? [],
      invoices: dto.invoices?.map((i) => i.toString()) ?? [],
    };
  }

  toDTO(entity: BusinessPartner | undefined): BusinessPartnerDTO | undefined {
    if (!entity) {
      return undefined;
    }
    const address = this.dataStore
      .getAddresses()
      .find((a) => a.id === entity.address);

    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      address: this.addressConverter.toDTO(address),
      contactPersons: entity.contactPersons.map((cp) => parseInt(cp)),
      invoices: entity.invoices.map((i) => parseInt(i)),
    };
  }
}
