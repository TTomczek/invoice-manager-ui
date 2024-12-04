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

        const entity: InvoiceTemplate = {
            id: dto.id,
            name: dto.name ?? '',
            backgroundPdf: dto.fileId,
            marginTopFirstPage: dto.marginTopFirstPage ?? 0,
            marginBottomFirstPage: dto.marginBottomFirstPage ?? 0,
            marginTopOtherPages: dto.marginTopOtherPages ?? 0,
            marginBottomOtherPages: dto.marginBottomOtherPages ?? 0,
        };
        return entity;
    }

    toDTO(entity: InvoiceTemplate | undefined): InvoiceTemplateDTO | undefined {
        if (!entity) {
            return undefined;
        }

        const dto: InvoiceTemplateDTO = {
            id: entity.id,
            name: entity.name,
            fileId: entity.backgroundPdf,
            marginTopFirstPage: entity.marginTopFirstPage,
            marginBottomFirstPage: entity.marginBottomFirstPage,
            marginTopOtherPages: entity.marginTopOtherPages,
            marginBottomOtherPages: entity.marginBottomOtherPages,

        };
        return dto;
    }
}
