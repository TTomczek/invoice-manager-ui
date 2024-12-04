export interface Invoice {
  id: number | undefined;
  description: string;
  perMail: boolean;
  preText: string;
  postText: string;
  serviceProvidedFrom: string;
  serviceProvidedTo: string;
  orderNumber: string;
  file: number | undefined;
  salesTax: number | undefined;
  invoicePositions: number[];
  receiver: number | undefined;
  invoiceTemplate: number | undefined;
  customer: number | undefined;
}
