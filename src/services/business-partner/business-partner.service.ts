import { BusinessPartner } from '../../models/business-partner.model';

export abstract class BusinessPartnerService {
    abstract getBusinessPartnerById(businessPartnerId: number): Promise<BusinessPartner | undefined>;
    abstract getBusinessPartners(): Promise<BusinessPartner[] | undefined>;
    abstract createBusinessPartner(businessPartner: BusinessPartner): Promise<BusinessPartner | undefined>;
    abstract updateBusinessPartner(businessPartnerId: number, businessPartner: BusinessPartner): Promise<BusinessPartner | undefined>;
    abstract deleteBusinessPartner(businessPartnerId: number): Promise<BusinessPartner | undefined>;
}
