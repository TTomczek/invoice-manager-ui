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
    protected maxFileSize = environment.maxFileSize;

    private fileToUpload: File | null = null;

    protected selectedEntity: InvoiceTemplate = {
        id: undefined,
        name: '',
        marginTopFirstPage: 0,
        marginBottomFirstPage: 0,
        marginTopOtherPages: 0,
        marginBottomOtherPages: 0,
        backgroundPdf: '',
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
            backgroundPdf: '',
        };
    }

    async createInvoiceTemplate(invoiceTemplate: InvoiceTemplate) {
        console.log('createInvoiceTemplate', invoiceTemplate);
        if (this.fileToUpload) {
            const backgroundPdfId = await this.invoiceTemplateFacade.uploadBackgroundPdf(this.fileToUpload);
            invoiceTemplate.backgroundPdf = backgroundPdfId.toString();
            console.log('backgroundPdfId', backgroundPdfId);
            this.invoiceTemplateFacade.createInvoiceTemplate(invoiceTemplate);
            this.unselectEntity();
            this.emptyFileToUpload();
        }
    }

    async updateInvoiceTemplate(invoiceTemplate: InvoiceTemplate) {
        if (this.fileToUpload) {
            const newBackgroundPdfId = await this.invoiceTemplateFacade.uploadBackgroundPdf(this.fileToUpload);
            invoiceTemplate.backgroundPdf = newBackgroundPdfId.toString();
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
        console.log(this.fileToUpload.name);
    }

    private emptyFileToUpload() {
        this.fileToUpload = null;
        if (this.fileUpload) {
            this.fileUpload.clear();
        }
    }
}
