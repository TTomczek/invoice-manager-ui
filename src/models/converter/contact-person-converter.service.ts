import { inject, Injectable } from '@angular/core';
import { ContactPersonDTO } from '@invoice-manager/api-typescript-angular-client';
import { ContactPerson } from '../contact-person.model';
import { SalutationConverterService } from './salutation-converter.service';
import { AddressConverterService } from './address-converter.service';

@Injectable({
  providedIn: 'root'
})
export class ContactPersonConverterService {

  private readonly salutationConverter = inject(SalutationConverterService);
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
        address: this.addressConverter.toEntity(dto.address),
        businessPartner: dto.businessPartner?.toString() ?? '',
        salutation: this.salutationConverter.toEntity(dto.salutation),
      };
    }

    toDTO(entity: ContactPerson | undefined): ContactPersonDTO | undefined {
      if (!entity) {
        return undefined;
      }
      return {
        id: entity.id,
        firstName: entity.firstName ?? '',
        name: entity.name ?? '',
        email: entity.email ?? '',
        address: this.addressConverter.toDTO(entity.address),
        businessPartner: parseInt(entity.businessPartner),
        salutation: this.salutationConverter.toDTO(entity.salutation)
      };
    }
}
