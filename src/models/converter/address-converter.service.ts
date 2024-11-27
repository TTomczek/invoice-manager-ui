import { Injectable } from '@angular/core';
import { AddressDTO } from '@invoice-manager/api-typescript-angular-client';
import { Address } from '../address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressConverterService {

  toEntity(dto: AddressDTO | undefined): Address | undefined {
    if (!dto) {
      return undefined
    }
    return {
      id: dto.id,
      street: dto.street ?? '',
      houseNumber: dto.number ?? '',
      city: dto.city ?? '',
      zipCode: dto.zip ?? '',
      country: dto.country ?? ''
    };
  }

  toDTO(entity: Address | undefined): AddressDTO | undefined {
    if (!entity) {
      return undefined
    }
    return {
      id: entity.id,
      street: entity.street,
      city: entity.city,
      zip: entity.zipCode,
      country: entity.country
    };
  }

}
