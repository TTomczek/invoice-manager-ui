import { Injectable } from '@angular/core';
import { ContactPersonService } from './contact-person.service';
import { ContactPerson } from '../../models/contact-person.model';

@Injectable({
    providedIn: 'root',
})
export class DefaultContactPersonService implements ContactPersonService {
    private contactPersons: ContactPerson[] = [];

    getContactPersons(): Promise<ContactPerson[] | undefined> {
        return Promise.resolve(this.contactPersons);
    }

    createContactPerson(contactPerson: ContactPerson): Promise<ContactPerson | undefined> {
        contactPerson.id = this.contactPersons.length + Math.random() * 10;
        this.contactPersons.push(contactPerson);
        return Promise.resolve(contactPerson);
    }

    deleteContactPerson(contactPersonId: number): Promise<ContactPerson | undefined> {
        const deletedContactPerson = this.contactPersons.find((contactPerson) => contactPerson.id === contactPersonId);
        if (deletedContactPerson) {
            this.contactPersons = this.contactPersons.filter((contactPerson) => contactPerson.id !== contactPersonId);
        }
        return Promise.resolve(deletedContactPerson);
    }

    getContactPersonById(contactPersonId: number): Promise<ContactPerson | undefined> {
        return Promise.resolve(this.contactPersons.find((contactPerson) => contactPerson.id === contactPersonId));
    }

    updateContactPerson(contactPersonId: number, contactPerson: ContactPerson): Promise<ContactPerson | undefined> {
        const updatedContactPerson = this.contactPersons.find((contactPerson) => contactPerson.id === contactPersonId);
        if (updatedContactPerson) {
            this.contactPersons = this.contactPersons.map((partner) => contactPerson.id === contactPersonId ? contactPerson : partner);
            return Promise.resolve(contactPerson);
        }
        return Promise.reject('Contact Person not found');
    }
}
