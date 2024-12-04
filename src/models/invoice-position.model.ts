import { Unit } from './unit';

export interface InvoicePosition {
  id: number | undefined;
  description: string;
  quantity: number;
  unit: Unit;
  pricePerUnitInCents: number;
  invoice: number | undefined;
}
