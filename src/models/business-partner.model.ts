export interface BusinessPartner {
  id: number | undefined;
  name: string;
  description: string;
  address: string;
  contactPersons: string[];
  invoices: string[];
}
