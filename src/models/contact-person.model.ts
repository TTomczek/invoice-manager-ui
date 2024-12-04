import { Salutation } from './salutation';
import { Address } from './address.model';

export interface ContactPerson {
  id: number | undefined;
  name: string;
  firstName: string;
  email: string;
  address: Address;
  businessPartner: string;
  salutation: Salutation;
}
