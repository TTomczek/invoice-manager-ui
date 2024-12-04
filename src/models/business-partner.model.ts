import { Address } from './address.model';

export interface BusinessPartner {
  id: number | undefined;
  name: string;
  description: string;
  address: Address;
  contactPersons: number[];
  invoices: number[];
}
