import { Injectable } from '@angular/core';
import { InvoicePositionDTO } from '@invoice-manager/api-typescript-angular-client';
import UnitEnum = InvoicePositionDTO.UnitEnum;
import { Unit } from '../unit';

@Injectable({
  providedIn: 'root'
})
export class UnitConverterService {

  toEntity(dto: UnitEnum | undefined): Unit {
    switch (dto) {
      case UnitEnum.Hour:
        return Unit.HOUR;
      case UnitEnum.Pd:
        return Unit.PD;
      default:
        return Unit.PIECE;
    }
  }

  toDTO(entity: Unit | undefined): UnitEnum {
    switch (entity) {
      case Unit.HOUR:
        return UnitEnum.Hour;
      case Unit.PD:
        return UnitEnum.Pd;
      default:
        return UnitEnum.Piece;
    }
  }

}
