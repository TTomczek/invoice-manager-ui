export interface Invoice {
  id: number | undefined;
  description: string;
  perMail: boolean;
  preText: string;
  postText: string;
  serviceProvidedFrom: Date | undefined;
  serviceProvidedTo: Date | undefined;
  orderNumber: string;
  file: number | undefined;
  salesTax: number | undefined;
  invoicePositions: number[];
  receiver: number | undefined;
  invoiceTemplate: number | undefined;
  customer: number | undefined;
  paid: boolean;
}
