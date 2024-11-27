export interface Invoice {
  id: number | undefined;
  description: string;
  perMail: boolean;
  preText: string;
  postText: string;
  serviceProvidedFrom: string;
  serviceProvidedTo: string;
  orderNumber: string;
  file: string;
  salesTax: string;
  invoicePositions: string[];
  receiver: string;
  invoiceTemplate: string;
  customer: string;
}
