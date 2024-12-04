import { inject, Injectable } from '@angular/core';
import { ContactPersonService } from './contact-person.service';
import { ContactPerson } from '../../models/contact-person.model';
import { ContactPersonsService } from '@invoice-manager/api-typescript-angular-client';
import { lastValueFrom } from 'rxjs';
import { ContactPersonConverterService } from '../../models/converter/contact-person-converter.service';

@Injectable({
    providedIn: 'root'
})
export class ContactPersonImplService implements ContactPersonService {
    private contactPersonService: ContactPersonsService = inject(ContactPersonsService);
    private contactPersonConverter: ContactPersonConverterService = inject(ContactPersonConverterService);

    async createContactPerson(contactPerson: ContactPerson): Promise<ContactPerson | undefined> {
        const contactPersonDTO = this.contactPersonConverter.toDTO(contactPerson);
        if (!contactPersonDTO) {
            return Promise.reject('converter failed');
        }
        return lastValueFrom(this.contactPersonService.createContactPerson(contactPersonDTO)).then((createdContactPerson) => {
            if (!createdContactPerson) {
                return undefined;
            }
            return this.contactPersonConverter.toEntity(createdContactPerson);
        });
    }

    async deleteContactPerson(id: number): Promise<ContactPerson | undefined> {
        return lastValueFrom(this.contactPersonService.deleteContactPersonById(id)).then((deletedContactPerson) => {
            return this.contactPersonConverter.toEntity(deletedContactPerson);
        });
    }

    async getContactPersonById(id: number): Promise<ContactPerson | undefined> {
        return lastValueFrom(this.contactPersonService.getContactPersonById(id)).then((contactPerson) => {
            return this.contactPersonConverter.toEntity(contactPerson);
        });
    }

    async getContactPersonsForBusinessPartner(id: number): Promise<ContactPerson[] | undefined> {
        return Promise.resolve(undefined);
    }

    async updateContactPerson(id: number, contactPerson: ContactPerson): Promise<ContactPerson | undefined> {
        const contactPersonDTO = this.contactPersonConverter.toDTO(contactPerson);
        if (!contactPersonDTO) {
            return Promise.reject('converter failed');
        }
        return lastValueFrom(this.contactPersonService.updateContactPersonById(id, contactPersonDTO)).then((updatedContactPerson) => {
            if (!updatedContactPerson) {
                return undefined;
            }
            return this.contactPersonConverter.toEntity(updatedContactPerson);
        });
    }
}
