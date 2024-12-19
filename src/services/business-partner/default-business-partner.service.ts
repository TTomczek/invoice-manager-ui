import { BusinessPartnerService } from './business-partner.service';
import { inject, Injectable } from '@angular/core';
import { BusinessPartner } from '../../models/business-partner.model';
import { ContactPerson } from '../../models/contact-person.model';
import { DefaultContactPersonService } from '../contact-person/default-contact-person.service';

@Injectable({
    providedIn: 'root',
})
export class DefaultBusinessPartnerService implements BusinessPartnerService {
    private defaultContactPersonService: DefaultContactPersonService = inject(DefaultContactPersonService);
    private businessPartners: BusinessPartner[] = [];
    private nextId = 3;

    constructor() {
        this.businessPartners.push({
            id: 1,
            name: 'Meyer Limited',
            description: 'Meyer Limited is a company that sells software products.',
            invoices: [1],
            contactPersons: [1, 2],
            address: {
                street: 'Meyer Street 1',
                city: 'Meyer City',
                zipCode: '12345',
                country: 'Meyer Country',
                houseNumber: '1',
                id: 1,
            },
        });
        this.businessPartners.push({
            id: 2,
            name: 'Meyer non profit',
            description: 'Meyer non profit is a company that sells software products.',
            invoices: [],
            contactPersons: [],
            address: {
                street: 'Meyer Street 2',
                city: 'Meyer City',
                zipCode: '12345',
                country: 'Meyer Country',
                houseNumber: '2',
                id: 2,
            },
        });
    }

    createBusinessPartner(businessPartner: BusinessPartner): Promise<BusinessPartner | undefined> {
        businessPartner.id = this.nextId;
        this.nextId += 1;
        this.businessPartners.push(businessPartner);
        return Promise.resolve(businessPartner);
    }

    deleteBusinessPartner(businessPartnerId: number): Promise<BusinessPartner | undefined> {
        const deletedBusinessPartner = this.businessPartners.find(
            (businessPartner) => businessPartner.id === businessPartnerId
        );
        if (deletedBusinessPartner) {
            this.businessPartners = this.businessPartners.filter(
                (businessPartner) => businessPartner.id !== businessPartnerId
            );
        }
        return Promise.resolve(deletedBusinessPartner);
    }

    getBusinessPartnerById(businessPartnerId: number): Promise<BusinessPartner | undefined> {
        return Promise.resolve(
            this.businessPartners.find((businessPartner) => businessPartner.id === businessPartnerId)
        );
    }

    getBusinessPartners(): Promise<BusinessPartner[] | undefined> {
        return Promise.resolve([...this.businessPartners]);
    }

    updateBusinessPartner(
        businessPartnerId: number,
        businessPartner: BusinessPartner
    ): Promise<BusinessPartner | undefined> {
        const updatedBusinessPartner = this.businessPartners.find(
            (businessPartner) => businessPartner.id === businessPartnerId
        );
        if (updatedBusinessPartner) {
            this.businessPartners = this.businessPartners.map((partner) =>
                businessPartner.id === businessPartnerId ? businessPartner : partner
            );
            return Promise.resolve(businessPartner);
        }
        return Promise.reject('Business Partner not found');
    }

    async getContactPersonsOfBusinessPartner(businessPartnerId: number): Promise<ContactPerson[] | undefined> {
        const contactPersons = await this.defaultContactPersonService.getContactPersons();
        if (!contactPersons) {
            return undefined;
        }
        return contactPersons.filter((contactPerson) => contactPerson.businessPartner == businessPartnerId);
    }
}
