import { inject, Injectable } from '@angular/core';
import { InvoiceTemplateService } from './invoice-template.service';
import { InvoiceTemplate } from '../../models/invoice-template.model';
import { InvoiceTemplatesService } from '@invoice-manager/api-typescript-angular-client';
import { InvoiceTemplateConverterService } from '../../models/converter/invoice-template-converter.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceTemplateImplService implements InvoiceTemplateService {
  private invoiceTemplateApi: InvoiceTemplatesService = inject(InvoiceTemplatesService);
  private invoiceTemplateConverter = inject(InvoiceTemplateConverterService);

  async createInvoiceTemplate(invoiceTemplate: InvoiceTemplate): Promise<InvoiceTemplate | undefined> {
    const invoiceTemplateDto = this.invoiceTemplateConverter.toDTO(invoiceTemplate);
    if (!invoiceTemplateDto) {
      return Promise.reject('converter failed');
    }
    return lastValueFrom(this.invoiceTemplateApi.createInvoiceTemplate(invoiceTemplateDto)).then((createdInvoiceTemplateDto) => {
      if (!createdInvoiceTemplateDto) {
        return undefined;
      }
      return this.invoiceTemplateConverter.toEntity(createdInvoiceTemplateDto);
    });
  }

  async deleteInvoiceTemplate(invoiceTemplateId: number): Promise<InvoiceTemplate | undefined> {
      const deletedInvoiceTemplateDto = await lastValueFrom(this.invoiceTemplateApi.deleteInvoiceTemplateById(invoiceTemplateId));
      return this.invoiceTemplateConverter.toEntity(deletedInvoiceTemplateDto);
  }

  async getAllInvoiceTemplates(): Promise<InvoiceTemplate[] | undefined> {
      return lastValueFrom(this.invoiceTemplateApi.getAllInvoiceTemplates()).then((invoiceTemplateDtos) => {
          return invoiceTemplateDtos.map((invoiceTemplateDto) => {
              return this.invoiceTemplateConverter.toEntity(invoiceTemplateDto);
          }).filter((invoiceTemplate) => invoiceTemplate !== undefined);
      });
  }

  async getInvoiceTemplateById(invoiceTemplateId: number): Promise<InvoiceTemplate | undefined> {
    return lastValueFrom(this.invoiceTemplateApi.getInvoiceTemplateById(invoiceTemplateId)).then((invoiceTemplateDto) => {
      return this.invoiceTemplateConverter.toEntity(invoiceTemplateDto);
    });
  }

  async updateInvoiceTemplate(invoiceTemplateId: number, invoiceTemplate: InvoiceTemplate): Promise<InvoiceTemplate | undefined> {
    const invoiceTemplateDto = this.invoiceTemplateConverter.toDTO(invoiceTemplate);
    if (!invoiceTemplateDto) {
      return Promise.reject('converter failed');
    }
    return lastValueFrom(this.invoiceTemplateApi.updateInvoiceTemplateById(invoiceTemplateId, invoiceTemplateDto)).then((updatedInvoiceTemplateDto) => {
      if (!updatedInvoiceTemplateDto) {
        return undefined;
      }
      return this.invoiceTemplateConverter.toEntity(updatedInvoiceTemplateDto);
    });
  }


}
