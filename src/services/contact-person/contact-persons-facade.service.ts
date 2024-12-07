import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ContactPerson } from '../../models/contact-person.model';
import { ContactPersonService } from './contact-person.service';
import { MessageService } from 'primeng/api';
import { BusinessPartnerService } from '../business-partner/business-partner.service';

@Injectable({
    providedIn: 'root'
})
export class ContactPersonFacade {
    private contactPersonService: ContactPersonService = inject(ContactPersonService);
    private businessPartnerService: BusinessPartnerService = inject(BusinessPartnerService);
    private messageService: MessageService = inject(MessageService);

    private readonly contactPersons: WritableSignal<ContactPerson[]> = signal([]);
    public getContactPersons = this.contactPersons.asReadonly();

    loadContactPersons(businessPartnerId: number): void {
        this.businessPartnerService.getContactPersonsOfBusinessPartner(businessPartnerId).then((contactPersons) => {
            if (contactPersons) {
                this.contactPersons.set(contactPersons);
            }
        }).catch((error) => {
            this.messageService.add({ key: 'contact-persons.load-error', severity: 'error' });
            console.error('Contact persons load error', error);
        });
    }

    createContactPerson(contactPerson: ContactPerson): void {
        this.contactPersonService.createContactPerson(contactPerson).then((createdContactPerson) => {
            if (createdContactPerson) {
                this.contactPersons.set([...this.getContactPersons(), createdContactPerson]);
            }
        });
    }

    deleteContactPerson(contactPersonId: number): void {
        this.contactPersonService.deleteContactPerson(contactPersonId).then((deletedContactPerson) => {
            if (deletedContactPerson) {
                this.contactPersons.set(this.getContactPersons().filter((contactPerson) => contactPerson.id !== deletedContactPerson.id));
            }
        });
    }

    updateContactPerson(contactPersonId: number, contactPerson: ContactPerson): void {
        this.contactPersonService.updateContactPerson(contactPersonId, contactPerson).then((updatedContactPerson) => {
            if (updatedContactPerson) {
                this.contactPersons.set(this.getContactPersons().map((contactPerson) => contactPerson.id === updatedContactPerson.id ? updatedContactPerson : contactPerson));
            }
        });
    }

    getContactPersonById(contactPersonId: number): ContactPerson | undefined {
        return this.getContactPersons().find((contactPerson) => contactPerson.id === contactPersonId);
    }

}
