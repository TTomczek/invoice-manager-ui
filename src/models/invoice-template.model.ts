export interface InvoiceTemplate {
  id: number | undefined;
  name: string;
  marginTopFirstPage: number;
  marginBottomFirstPage: number;
  marginTopOtherPages: number;
  marginBottomOtherPages: number;
  backgroundPdf: string;
}
