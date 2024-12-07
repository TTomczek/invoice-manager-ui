import { ContactPerson } from '../../models/contact-person.model';

export abstract class ContactPersonService {
    abstract getContactPersons(): Promise<ContactPerson[] | undefined>;
    abstract getContactPersonById(id: number): Promise<ContactPerson | undefined>;
    abstract createContactPerson(contactPerson: ContactPerson): Promise<ContactPerson | undefined>;
    abstract updateContactPerson(id: number, contactPerson: ContactPerson): Promise<ContactPerson | undefined>;
    abstract deleteContactPerson(id: number): Promise<ContactPerson | undefined>;
}
