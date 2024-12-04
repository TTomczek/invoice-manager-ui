import { Component, inject, ViewChild } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PrimeTemplate } from 'primeng/api';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { TranslatePipe } from '@ngx-translate/core';
import { InvoiceTemplateFacade } from '../../services/invoice-template/invoice-template-facade.service';
import { InvoiceTemplate } from '../../models/invoice-template.model';
import { FileSelectEvent, FileUpload, FileUploadModule } from 'primeng/fileupload';
import { environment } from '../../environments/environment';
import { TranslatableMessageService } from '../../services/translatable-message.service';

@Component({
    selector: 'im-invoice-template-list',
    standalone: true,
    imports: [
        ButtonDirective,
        FormsModule,
        InputTextModule,
        MessagesModule,
        PrimeTemplate,
        TableModule,
        TranslatePipe,
        FileUploadModule,
    ],
    templateUrl: './invoice-template-list.component.html',
    styleUrl: './invoice-template-list.component.css',
})
export class InvoiceTemplateListComponent {
    protected invoiceTemplateFacade = inject(InvoiceTemplateFacade);
    private messageService = inject(TranslatableMessageService);

    protected maxFileSize = environment.maxFileSize;
    private fileToUpload: File | null = null;


    protected selectedEntity: InvoiceTemplate = {
        id: undefined,
        name: '',
        marginTopFirstPage: 0,
        marginBottomFirstPage: 0,
        marginTopOtherPages: 0,
        marginBottomOtherPages: 0,
        backgroundPdf: undefined,
    };

    @ViewChild('backgroundPdfFileUpload') fileUpload: FileUpload | undefined;

    constructor() {
        this.invoiceTemplateFacade.loadInvoiceTemplates();
    }

    selectEntity(event: TableRowSelectEvent) {
        this.selectedEntity = { ...event.data };
    }

    unselectEntity() {
        this.selectedEntity = {
            id: undefined,
            name: '',
            marginTopFirstPage: 0,
            marginBottomFirstPage: 0,
            marginTopOtherPages: 0,
            marginBottomOtherPages: 0,
            backgroundPdf: undefined,
        };
    }

    async createInvoiceTemplate(invoiceTemplate: InvoiceTemplate) {
        if (this.fileToUpload) {
            const backgroundPdfId = await this.invoiceTemplateFacade.uploadBackgroundPdf(this.fileToUpload);
            invoiceTemplate.backgroundPdf = backgroundPdfId;
            this.invoiceTemplateFacade.createInvoiceTemplate(invoiceTemplate);
            this.unselectEntity();
            this.emptyFileToUpload();
        } else {
            this.messageService.add({ key: 'error.invoiceTemplate.create.missing-file', severity: 'error' });
        }
    }

    async updateInvoiceTemplate(invoiceTemplate: InvoiceTemplate) {
        if (this.fileToUpload) {
            const newBackgroundPdfId = await this.invoiceTemplateFacade.uploadBackgroundPdf(this.fileToUpload);
            invoiceTemplate.backgroundPdf = newBackgroundPdfId;
        }
        if (invoiceTemplate.id) {
            this.invoiceTemplateFacade.updateInvoiceTemplate(invoiceTemplate.id, invoiceTemplate);
        }
        this.unselectEntity();
        this.emptyFileToUpload();
    }

    deleteInvoiceTemplate(invoiceTemplate: InvoiceTemplate) {
        if (invoiceTemplate.id) {
            this.invoiceTemplateFacade.deleteInvoiceTemplate(invoiceTemplate.id);
        }
        this.unselectEntity();
    }

    onUpload(event: FileSelectEvent) {
        this.fileToUpload = event.files[0];
    }

    downloadTemplate(id: string) {
        const fileId = parseInt(id);
        if (Number.isNaN(fileId)) {
            this.messageService.add({ key: 'error.invoiceTemplate.download', severity: 'error' });
            return;
        }
        this.invoiceTemplateFacade.downloadBackgroundPdf(fileId);
    }

    private emptyFileToUpload() {
        this.fileToUpload = null;
        if (this.fileUpload) {
            this.fileUpload.clear();
        }
    }
}
