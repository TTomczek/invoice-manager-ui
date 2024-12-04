import { BusinessPartnerService } from './business-partner.service';
import { Injectable } from '@angular/core';
import { BusinessPartner } from '../../models/business-partner.model';

@Injectable({
    providedIn: 'root'
})
export class DefaultBusinessPartnerService implements BusinessPartnerService {
    private businessPartners: BusinessPartner[] = [];

    createBusinessPartner(businessPartner: BusinessPartner): Promise<BusinessPartner | undefined> {
        businessPartner.id = this.businessPartners.length + Math.random() * 10;
        this.businessPartners.push(businessPartner);
        return Promise.resolve(businessPartner);
    }

    deleteBusinessPartner(businessPartnerId: number): Promise<BusinessPartner | undefined> {
        const deletedBusinessPartner = this.businessPartners.find((businessPartner) => businessPartner.id === businessPartnerId);
        if (deletedBusinessPartner) {
            this.businessPartners = this.businessPartners.filter((businessPartner) => businessPartner.id !== businessPartnerId);
        }
        return Promise.resolve(deletedBusinessPartner);
    }

    getBusinessPartnerById(businessPartnerId: number): Promise<BusinessPartner | undefined> {
        return Promise.resolve(this.businessPartners.find((businessPartner) => businessPartner.id === businessPartnerId));
    }

    getBusinessPartners(): Promise<BusinessPartner[] | undefined> {
        return Promise.resolve(this.businessPartners);
    }

    updateBusinessPartner(businessPartnerId: number, businessPartner: BusinessPartner): Promise<BusinessPartner | undefined> {
        const updatedBusinessPartner = this.businessPartners.find((businessPartner) => businessPartner.id === businessPartnerId);
        if (updatedBusinessPartner) {
            this.businessPartners = this.businessPartners.map((partner) => businessPartner.id === businessPartnerId ? businessPartner : partner);
            return Promise.resolve(businessPartner);
        }
        return Promise.reject('Business Partner not found');
    }

}
