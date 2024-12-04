import { Injectable } from '@angular/core';
import { AddressDTO } from '@invoice-manager/api-typescript-angular-client';
import { Address } from '../address.model';

@Injectable({
    providedIn: 'root',
})
export class AddressConverterService {
    toEntity(dto: AddressDTO | undefined): Address {
        if (!dto) {
            return {
                id: undefined,
                street: '',
                houseNumber: '',
                city: '',
                zipCode: '',
                country: '',
            };
        }
        return {
            id: dto.id,
            street: dto.street ?? '',
            houseNumber: dto.number ?? '',
            city: dto.city ?? '',
            zipCode: dto.zip ?? '',
            country: dto.country ?? '',
        };
    }

    toDTO(entity: Address | undefined): AddressDTO {
        if (!entity) {
            return {
                id: undefined,
                street: '',
                number: '',
                city: '',
                zip: '',
                country: '',
            };
        }
        return {
            id: entity.id,
            street: entity.street,
            number: entity.houseNumber,
            city: entity.city,
            zip: entity.zipCode,
            country: entity.country,
        };
    }
}
