import { Component, computed, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { AddressFormComponent } from '../address-form/address-form.component';
import { ButtonDirective } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PrimeTemplate } from 'primeng/api';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthState } from '../../state/auth-state.service';
import { InvoiceFacade } from '../../services/invoice/invoice-facade.service';
import { Invoice } from '../../models/invoice.model';
import { Router } from '@angular/router';
import { SalesTaxFacade } from '../../services/sales-tax/sales-tax-facade.service';
import { BusinessPartnerFacade } from '../../services/business-partner/business-partner-facade.service';
import { ContactPersonFacade } from '../../services/contact-person/contact-persons-facade.service';
import { InvoiceTemplateFacade } from '../../services/invoice-template/invoice-template-facade.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownItem } from '../../commons/dropdown-item';

function toNumber(key: number | undefined | string): number | undefined {
    if (typeof key === 'string') {
        return parseInt(key);
    } else if (typeof key === 'number') {
        return key;
    }
    return undefined;
}

@Component({
    selector: 'im-invoice-list-component',
    standalone: true,
    imports: [
        AddressFormComponent,
        ButtonDirective,
        FormsModule,
        InputTextModule,
        PaginatorModule,
        PrimeTemplate,
        TableModule,
        TranslatePipe,
        InputTextareaModule,
        CalendarModule,
        CheckboxModule,
    ],
    templateUrl: './invoice-list.component.html',
    styleUrl: './invoice-list.component.scss',
})
export class InvoiceListComponent {
    private router: Router = inject(Router);
    private salesTaxFacade = inject(SalesTaxFacade);
    private businessPartnerFacade = inject(BusinessPartnerFacade);
    private contactPersonFacade = inject(ContactPersonFacade);
    private templateFacade = inject(InvoiceTemplateFacade);

    protected invoiceFacade = inject(InvoiceFacade);
    protected authState = inject(AuthState);

    protected selectedEntity: Invoice = {
        id: 0,
        orderNumber: '',
        description: '',
        preText: '',
        postText: '',
        serviceProvidedFrom: '',
        serviceProvidedTo: '',
        perMail: true,
        salesTax: undefined,
        invoiceTemplate: undefined,
        file: undefined,
        customer: undefined,
        receiver: undefined,
        invoicePositions: [],
        paid: false,
    };

    constructor() {
        this.invoiceFacade.loadInvoices();
        this.salesTaxFacade.loadSalesTaxes();
        this.businessPartnerFacade.loadBusinessPartners();
        this.templateFacade.loadInvoiceTemplates();

        effect(() => {
            const options = this.salesTaxOptions();
            if (options.length < 1) {
                this.selectedEntity.salesTax = undefined;
            }
            const id = toNumber(options[0]?.key);
            this.selectedEntity.salesTax = id;
        });

        effect(() => {
            const options = this.businessPartnerOptions();
            if (options.length < 1) {
                this.selectedEntity.customer = undefined;
            }
            const id = toNumber(options[0]?.key);
            this.selectedEntity.customer = id;
        });

        effect(() => {
            const options = this.contactPersonOptions();
            if (options.length < 1) {
                this.selectedEntity.receiver = undefined;
            }
            const id = toNumber(options[0]?.key);
            this.selectedEntity.receiver = id;
        });

        effect(() => {
            const options = this.invoiceTemplateOptions();
            if (options.length < 1) {
                this.selectedEntity.invoiceTemplate = undefined;
            }
            const id = toNumber(options[0]?.key);
            this.selectedEntity.invoiceTemplate = id;
        });
    }

    protected selectEntity(event: TableRowSelectEvent): void {
        this.selectedEntity = {...this.selectedEntity,  ...event.data };
    }

    protected unselectEntity(): void {
        this.selectedEntity = {
            id: 0,
            orderNumber: '',
            description: '',
            preText: '',
            postText: '',
            serviceProvidedFrom: '',
            serviceProvidedTo: '',
            perMail: true,
            salesTax: undefined,
            invoiceTemplate: undefined,
            file: undefined,
            customer: undefined,
            receiver: undefined,
            invoicePositions: [],
            paid: false,
        };
    }

    protected navigateToInvoicePositions(id: number): void {
        this.router.navigate([`/invoices/${id}/positions`]);
    }

    protected updateInvoice(invoice: Invoice): void {
        if (invoice.id) {
            this.invoiceFacade.updateInvoice(invoice.id, invoice);
        }
        this.unselectEntity();
    }

    protected deleteInvoice(invoice: Invoice): void {
        if (invoice.id) {
            this.invoiceFacade.deleteInvoice(invoice.id);
        }
        this.unselectEntity();
    }

    protected createInvoice(invoice: Invoice): void {
        this.invoiceFacade.createInvoice(invoice);
        this.unselectEntity();
    }

    protected salesTaxOptions: Signal<DropdownItem[]> = computed(() => {
        return this.salesTaxFacade.getSalesTaxes().map((salesTax) => {
            return { key: salesTax.id, value: salesTax.name + ' (' + salesTax.rate + '%)' };
        }).filter((salesTax) => salesTax.key !== undefined);
    });

    protected businessPartnerOptions: Signal<DropdownItem[]> = computed(() => {
        return  this.businessPartnerFacade.getBusinessPartners().map((businessPartner) => {
            return { key: businessPartner.id, value: businessPartner.name };
        }).filter((businessPartner) => businessPartner.key !== undefined);
    });

    protected contactPersonOptions: Signal<DropdownItem[]> = computed(() => {
        return this.contactPersonFacade.getContactPersons().filter((contactPerson) => {
            return contactPerson.businessPartner === this.selectedEntity.customer;
        }).map((contactPerson) => {
            return { key: contactPerson.id, value: contactPerson.name}
        }).filter((contactPerson) => contactPerson.key !== undefined);
    });

    protected invoiceTemplateOptions: Signal<DropdownItem[]> = computed(() => {
        return this.templateFacade.getInvoiceTemplates().map((template) => {
            return { key: template.id, value: template.name };
        }).filter((template) => template.key !== undefined);
    });

    protected changeBusinessPartner(event: number): void {
        if (event) {
            this.selectedEntity.customer = event;
            this.contactPersonFacade.loadContactPersons(event);
        }
    }
}
