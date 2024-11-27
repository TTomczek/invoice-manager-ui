import { Salutation } from './salutation';

export interface ContactPerson {
  id: number | undefined;
  name: string;
  firstName: string;
  email: string;
  address: string;
  businessPartner: string;
  salutation: Salutation;
}
