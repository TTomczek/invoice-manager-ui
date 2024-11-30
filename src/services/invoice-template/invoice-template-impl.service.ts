import { inject, Injectable, signal, Signal } from '@angular/core';
import { InvoiceTemplateService } from './invoice-template.service';
import { InvoiceTemplate } from '../../models/invoice-template.model';
import { InvoiceTemplatesService } from '@invoice-manager/api-typescript-angular-client';
import { InvoiceTemplateConverterService } from '../../models/converter/invoice-template-converter.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { toUnredirectedSourceFile } from '@angular/compiler-cli/src/ngtsc/util/src/typescript';

@Injectable({
  providedIn: 'root'
})
export class InvoiceTemplateImplService implements InvoiceTemplateService {
  private invoiceTemplateApi: InvoiceTemplatesService = inject(InvoiceTemplatesService);
  private invoiceTemplateConverter = inject(InvoiceTemplateConverterService);

  createInvoiceTemplate(invoiceTemplate: InvoiceTemplate): Signal<InvoiceTemplate | undefined> {
    const invoiceTemplateDto = this.invoiceTemplateConverter.toDTO(invoiceTemplate);
    if (!invoiceTemplateDto) {
      return signal(undefined);
    }
    const createdInvoiceTemplateDto = toSignal(this.invoiceTemplateApi.createInvoiceTemplate(invoiceTemplateDto))();
    const createdInvoiceTemplate = this.invoiceTemplateConverter.toEntity(createdInvoiceTemplateDto);
    return signal(createdInvoiceTemplate);
  }

  deleteInvoiceTemplate(invoiceTemplateId: number): Signal<InvoiceTemplate | undefined> {
    const deletedInvoiceTemplateDto = toSignal(this.invoiceTemplateApi.deleteInvoiceTemplateById(invoiceTemplateId))();
    if (!deletedInvoiceTemplateDto) {
      return signal(undefined);
    }
    const deletedInvoiceTemplate = this.invoiceTemplateConverter.toEntity(deletedInvoiceTemplateDto);

    return signal(deletedInvoiceTemplate);
  }

  getAllInvoiceTemplates(): Signal<InvoiceTemplate[] | undefined> {
    const invoiceTemplateDtos = toSignal(this.invoiceTemplateApi.getAllInvoiceTemplates())();
    if (!invoiceTemplateDtos) {
      return signal([]);
    }
    const invoiceTemplates: InvoiceTemplate[] | undefined = [];
    invoiceTemplateDtos.forEach(invoiceTemplateDto => {
      const invoiceTemplate = this.invoiceTemplateConverter.toEntity(invoiceTemplateDto);
      if (invoiceTemplate) {
        invoiceTemplates.push(invoiceTemplate);
      }
    });
    return signal(invoiceTemplates);
  }

  getInvoiceTemplateById(invoiceTemplateId: number): Signal<InvoiceTemplate | undefined> {
    const invoiceTemplateDto = toSignal(this.invoiceTemplateApi.getInvoiceTemplateById(invoiceTemplateId))();
    if (!invoiceTemplateDto) {
      return signal(undefined);
    }

    const invoiceTemplate = this.invoiceTemplateConverter.toEntity(invoiceTemplateDto);
    return signal(invoiceTemplate);
  }

  updateInvoiceTemplate(invoiceTemplateId: number, invoiceTemplate: InvoiceTemplate): Signal<InvoiceTemplate | undefined> {
    const invoiceTemplateDto = this.invoiceTemplateConverter.toDTO(invoiceTemplate);
    if (!invoiceTemplateDto) {
      return signal(undefined);
    }
    const updatedInvoiceTemplateDto = toSignal(this.invoiceTemplateApi.updateInvoiceTemplateById(invoiceTemplateId, invoiceTemplateDto))();
    const updatedInvoiceTemplate = this.invoiceTemplateConverter.toEntity(updatedInvoiceTemplateDto);
    return signal(updatedInvoiceTemplate);
  }


}
