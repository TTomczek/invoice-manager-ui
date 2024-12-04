import { Address } from './address.model';

export interface BusinessPartner {
  id: number | undefined;
  name: string;
  description: string;
  address: Address;
  contactPersons: string[];
  invoices: string[];
}
