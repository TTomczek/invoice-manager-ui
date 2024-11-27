import { Injectable } from '@angular/core';
import { ContactPersonDTO } from '@invoice-manager/api-typescript-angular-client';
import { Salutation } from '../salutation';
import SalutationEnum = ContactPersonDTO.SalutationEnum;

@Injectable({
  providedIn: 'root',
})
export class SalutationConverterService {
  toEntity(dto: SalutationEnum | undefined): Salutation {
    switch (dto) {
      case SalutationEnum.Herr:
        return Salutation.HERR;
      case SalutationEnum.Frau:
        return Salutation.FRAU;
      default:
        return Salutation.DIVERS;
    }
  }

  toDTO(entity: Salutation | undefined): SalutationEnum {
    switch (entity) {
      case Salutation.HERR:
        return SalutationEnum.Herr;
      case Salutation.FRAU:
        return SalutationEnum.Frau;
      default:
        return SalutationEnum.Divers;
    }
  }
}
