import { Injectable } from '@angular/core';
import { InvoiceTemplateDTO } from '@invoice-manager/api-typescript-angular-client';
import { InvoiceTemplate } from '../invoice-template.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceTemplateConverterService {

  toEntity(dto: InvoiceTemplateDTO | undefined): InvoiceTemplate | undefined {
    if (!dto) {
      return undefined;
    }

    return {
      id: dto.id,
      name: dto.name ?? '',
      backgroundPdf: dto.fileId?.toString() ?? '',
      marginTopFirstPage: dto.marginTopFirstPage ?? 0,
      marginBottomFirstPage: dto.marginBottomFirstPage ?? 0,
      marginTopOtherPages: dto.marginTopOtherPages ?? 0,
      marginBottomOtherPages: dto.marginBottomOtherPages ?? 0,
    };
  }

  toDTO(entity: InvoiceTemplate | undefined): InvoiceTemplateDTO | undefined {
    if (!entity) {
      return undefined;
    }

    return {
      id: entity.id,
      name: entity.name,
      fileId: Number.parseInt(entity.backgroundPdf),
      marginTopFirstPage: entity.marginTopFirstPage,
      marginBottomFirstPage: entity.marginBottomFirstPage,
      marginTopOtherPages: entity.marginTopOtherPages,
      marginBottomOtherPages: entity.marginBottomOtherPages
    };
  }
}