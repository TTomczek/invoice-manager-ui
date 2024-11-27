import { inject, Injectable } from '@angular/core';
import { ContactPersonDTO } from '@invoice-manager/api-typescript-angular-client';
import { ContactPerson } from '../contact-person.model';
import { SalutationConverterService } from './salutation-converter.service';
import { DataStoreService } from '../../services/data-store.service';
import { AddressConverterService } from './address-converter.service';

@Injectable({
  providedIn: 'root'
})
export class ContactPersonConverterService {

  private readonly salutationConverter = inject(SalutationConverterService);
  private readonly dataStore = inject(DataStoreService);
  private readonly addressConverter = inject(AddressConverterService);

    toEntity(dto: ContactPersonDTO | undefined): ContactPerson | undefined {
      if (!dto) {
        return undefined;
      }
      return {
        id: dto.id,
        firstName: dto.firstName ?? '',
        name: dto.name ?? '',
        email: dto.email ?? '',
        address: dto.address?.id?.toString(10) ?? '',
        businessPartner: dto.businessPartner?.toString() ?? '',
        salutation: this.salutationConverter.toEntity(dto.salutation),
      };
    }

    toDTO(entity: ContactPerson | undefined): ContactPersonDTO | undefined {
      if (!entity) {
        return undefined;
      }
      const address = this.dataStore.getAddresses().find(a => a.id === entity.address);
      return {
        id: entity.id,
        firstName: entity.firstName ?? '',
        name: entity.name ?? '',
        email: entity.email ?? '',
        address: this.addressConverter.toDTO(address),
        businessPartner: parseInt(entity.businessPartner),
        salutation: this.salutationConverter.toDTO(entity.salutation)
      };
    }
}
