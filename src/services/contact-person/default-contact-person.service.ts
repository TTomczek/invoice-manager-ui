import { Injectable } from '@angular/core';
import { ContactPersonService } from './contact-person.service';
import { ContactPerson } from '../../models/contact-person.model';
import { Salutation } from '../../models/salutation';

@Injectable({
    providedIn: 'root',
})
export class DefaultContactPersonService implements ContactPersonService {
    private contactPersons: ContactPerson[] = [];
    private nextId = 3;

    constructor() {
        this.contactPersons = [
            {
                id: 1,
                name: 'Mustermann',
                firstName: 'Max',
                email: 'max.mustermann@example.de',
                salutation: Salutation.HERR,
                businessPartner: 1,
                address: {
                    id: 1,
                    street: 'Musterstraße',
                    zipCode: '12345',
                    city: 'Musterstadt',
                    country: 'Deutschland',
                    houseNumber: '1',
                },
            },
            {
                id: 2,
                name: 'Musterfrau',
                firstName: 'Maria',
                email: 'maria.musterfrau@example.de',
                salutation: Salutation.FRAU,
                businessPartner: 1,
                address: {
                    id: 2,
                    street: 'Musterstraße',
                    zipCode: '12345',
                    city: 'Musterstadt',
                    country: 'Deutschland',
                    houseNumber: '1',
                },
            },
        ];
    }

    getContactPersons(): Promise<ContactPerson[] | undefined> {
        return Promise.resolve([...this.contactPersons]);
    }

    createContactPerson(contactPerson: ContactPerson): Promise<ContactPerson | undefined> {
        contactPerson.id = this.nextId;
        this.nextId++;
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
