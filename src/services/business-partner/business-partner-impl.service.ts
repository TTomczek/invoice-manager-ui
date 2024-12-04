import { inject, Injectable } from '@angular/core';
import { BusinessPartnerService } from './business-partner.service';
import { BusinessPartnersService } from '@invoice-manager/api-typescript-angular-client';
import { BusinessPartnerConverterService } from '../../models/converter/business-partner-converter.service';
import { BusinessPartner } from '../../models/business-partner.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BusinessPartnerImplService implements BusinessPartnerService {

    private businessPartnerService = inject(BusinessPartnersService);
    private businessPartnerConverter = inject(BusinessPartnerConverterService);

    public async createBusinessPartner(businessPartner: BusinessPartner): Promise<BusinessPartner | undefined> {
        const businessPartnerDto = this.businessPartnerConverter.toDTO(businessPartner);
        if (!businessPartnerDto) {
            return Promise.reject('converter failed');
        }
        return lastValueFrom(this.businessPartnerService.createBusinessPartner(businessPartnerDto))
            .then((createdBusinessPartnerDto) => {
                if (!createdBusinessPartnerDto) {
                    return undefined;
                }
                return this.businessPartnerConverter.toEntity(createdBusinessPartnerDto);
            });
    }

    public async deleteBusinessPartner(businessPartnerId: number): Promise<BusinessPartner | undefined> {
        return lastValueFrom(this.businessPartnerService.deleteBusinessPartnerById(businessPartnerId)).then((deletedBusinessPartnerDto) => {
            return this.businessPartnerConverter.toEntity(deletedBusinessPartnerDto);
        });
    }

    public async getBusinessPartners(): Promise<BusinessPartner[] | undefined> {
        return lastValueFrom(this.businessPartnerService.getAllBusinessPartners()).then((businessPartnerDtos) => {
            return businessPartnerDtos.map((businessPartnerDto) => {
                return this.businessPartnerConverter.toEntity(businessPartnerDto);
            }).filter((businessPartner) => businessPartner !== undefined);
        });
    }

    public async getBusinessPartnerById(businessPartnerId: number): Promise<BusinessPartner | undefined> {
        return lastValueFrom(this.businessPartnerService.getBusinessPartnerById(businessPartnerId)).then((businessPartnerDto) => {
            return this.businessPartnerConverter.toEntity(businessPartnerDto);
        });
    }

    public async updateBusinessPartner(businessPartnerId: number, businessPartner: BusinessPartner): Promise<BusinessPartner | undefined> {
        const businessPartnerDto = this.businessPartnerConverter.toDTO(businessPartner);
        if (!businessPartnerDto) {
            return Promise.reject('converter failed');
        }
        return lastValueFrom(this.businessPartnerService.updateBusinessPartnerById(businessPartnerId, businessPartnerDto))
            .then((updatedBusinessPartnerDto) => {
                if (!updatedBusinessPartnerDto) {
                    return undefined;
                }
                return this.businessPartnerConverter.toEntity(updatedBusinessPartnerDto);
            });
    }

}
