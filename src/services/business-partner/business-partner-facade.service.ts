import { inject, Injectable, signal } from '@angular/core';
import { BusinessPartnerService } from './business-partner.service';
import { TranslatableMessageService } from '../translatable-message.service';
import { BusinessPartner } from '../../models/business-partner.model';

@Injectable({
    providedIn: 'root'
})
export class BusinessPartnerFacade {

    private businessPartnerService = inject(BusinessPartnerService);
    private messageService = inject(TranslatableMessageService);

    private readonly businessPartners = signal<BusinessPartner[]>([]);
    getBusinessPartners = this.businessPartners.asReadonly();

    loadBusinessPartners(): void {
        this.businessPartnerService.getBusinessPartners().then(businessPartners => {
            if (businessPartners) {
                this.businessPartners.set(businessPartners);
            }
        }).catch((error) => {
            this.messageService.add({ key: 'business-partners.load-error', severity: 'error' });
            console.error('Business partners load error', error);
        });
    }

    createBusinessPartner(businessPartner: BusinessPartner): void {
        this.businessPartnerService.createBusinessPartner(businessPartner).then(createdBusinessPartner => {
            if (createdBusinessPartner) {
                this.businessPartners.set([...this.getBusinessPartners(), createdBusinessPartner]);
            }
        }).catch((error) => {
            this.messageService.add({ key: 'business-partners.create-error', severity: 'error' });
            console.error('Business partner created error', error);
        });
    }

    deleteBusinessPartner(businessPartnerId: number): void {
        this.businessPartnerService.deleteBusinessPartner(businessPartnerId).then(deletedBusinessPartner => {
            if (deletedBusinessPartner) {
                this.businessPartners.set(this.getBusinessPartners().filter(businessPartner => businessPartner.id !== deletedBusinessPartner.id));
            }
        }).catch((error) => {
            this.messageService.add({ key: 'business-partners.delete-error', severity: 'error' });
            console.error('Business partner deleted error', error);
        });
    }

    updateBusinessPartner(businessPartnerId: number, businessPartner: BusinessPartner): void {
        this.businessPartnerService.updateBusinessPartner(businessPartnerId, businessPartner).then(updatedBusinessPartner => {
            if (updatedBusinessPartner) {
                this.businessPartners.set(this.getBusinessPartners().map(businessPartner => businessPartner.id === updatedBusinessPartner.id ? updatedBusinessPartner : businessPartner));
            }
        }).catch((error) => {
            this.messageService.add({ key: 'business-partners.update-error', severity: 'error' });
            console.error('Business partner updated error', error);
        });
    }

    getBusinessPartnerById(businessPartnerId: number): BusinessPartner | undefined {
        return this.businessPartners().find(businessPartner => businessPartner.id === businessPartnerId);
    }
}
