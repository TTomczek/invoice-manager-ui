import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListComponent } from './invoice-list.component';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { DefaultInvoiceService } from '../../services/invoice/default-invoice.service';
import { SalesTaxService } from '../../services/sales-tax/sales-tax.service';
import { DefaultSalesTaxService } from '../../services/sales-tax/default-sales-tax.service';
import { InvoiceTemplateService } from '../../services/invoice-template/invoice-template.service';
import { DefaultInvoiceTemplateService } from '../../services/invoice-template/default-invoice-template.service';
import { BusinessPartnerService } from '../../services/business-partner/business-partner.service';
import { DefaultBusinessPartnerService } from '../../services/business-partner/default-business-partner.service';
import { ContactPersonService } from '../../services/contact-person/contact-person.service';
import { DefaultContactPersonService } from '../../services/contact-person/default-contact-person.service';
import { MessageService } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { FileService } from '../../services/file/file.service';
import { DefaultFileService } from '../../services/file/default-file.service';
import { AuthState } from '../../state/auth-state.service';

describe('InvoiceListComponent', () => {
    let component: InvoiceListComponent;
    let fixture: ComponentFixture<InvoiceListComponent>;
    let authState: AuthState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InvoiceListComponent],
            providers: [
                {
                    provide: InvoiceService,
                    useClass: DefaultInvoiceService
                },
                {
                    provide: SalesTaxService,
                    useClass: DefaultSalesTaxService
                },
                {
                    provide: InvoiceTemplateService,
                    useClass: DefaultInvoiceTemplateService
                },
                {
                    provide: BusinessPartnerService,
                    useClass: DefaultBusinessPartnerService
                },
                {
                    provide: ContactPersonService,
                    useClass: DefaultContactPersonService
                },
                {
                  provide: FileService,
                    useClass: DefaultFileService
                },
                MessageService,
                TranslateService,
                importProvidersFrom(TranslateModule.forRoot())
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(InvoiceListComponent);
        component = fixture.componentInstance;
        authState = TestBed.inject(AuthState);
        authState.setUserRoles(['manager', 'viewer']);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create invoice', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(2);

        const invoiceNumberInput = fixture.nativeElement.querySelector('input[name="ordernumber"]');
        invoiceNumberInput.value = '123';
        invoiceNumberInput.dispatchEvent(new Event('input'));

        const descriptionInput = fixture.nativeElement.querySelector('input[name="description"]');
        descriptionInput.value = 'Testbeschreibung';
        descriptionInput.dispatchEvent(new Event('input'));

        const preTextInput = fixture.nativeElement.querySelector('textarea[name="preText"]');
        preTextInput.value = 'Testvorlage';
        preTextInput.dispatchEvent(new Event('input'));

        const postTextInput = fixture.nativeElement.querySelector('textarea[name="postText"]');
        postTextInput.value = 'Testnachricht';
        postTextInput.dispatchEvent(new Event('input'));

        const serviceFromInput = fixture.nativeElement.querySelector('input[name="serviceProvidedFrom"]');
        serviceFromInput.value = '2022-01-01';
        serviceFromInput.dispatchEvent(new Event('input'));

        const serviceToInput = fixture.nativeElement.querySelector('input[name="serviceProvidedTo"]');
        serviceToInput.value = '2022-01-31';
        serviceToInput.dispatchEvent(new Event('input'));

        const perMailCheckbox = fixture.nativeElement.querySelector('input[name="perMail"]');
        perMailCheckbox.checked = true;
        perMailCheckbox.dispatchEvent(new Event('change'));

        const salesTaxDropdown = fixture.nativeElement.querySelector('#salesTax');
        salesTaxDropdown.value = 2;
        salesTaxDropdown.dispatchEvent(new Event('change'));

        const businessPartnerDropdown = fixture.nativeElement.querySelector('#partner');
        businessPartnerDropdown.value = 2;
        businessPartnerDropdown.dispatchEvent(new Event('change'));

        const contactPersonDropdown = fixture.nativeElement.querySelector('#contact');
        contactPersonDropdown.value = 2;
        contactPersonDropdown.dispatchEvent(new Event('change'));

        const invoiceTemplateDropdown = fixture.nativeElement.querySelector('#template');
        invoiceTemplateDropdown.value = 2;
        invoiceTemplateDropdown.dispatchEvent(new Event('change'));

        const createButton = fixture.nativeElement.querySelector('button[name=create]');
        createButton.click();

        fixture.detectChanges();

        const tableRowsAfter = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRowsAfter.length).toBe(3);

        expect(tableRowsAfter[2].textContent).toContain('Testbeschreibung1230');
    });

    it('should delete invoice', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(2);

        tableRows[0].click();
        fixture.detectChanges();

        const deleteButton = fixture.nativeElement.querySelector('button[name=delete]');
        deleteButton.click();

        fixture.detectChanges();

        const tableRowsAfter = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRowsAfter.length).toBe(1);
    });

    it('should not delete invoice', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(2);

        tableRows[1].click();
        fixture.detectChanges();

        const deleteButton = fixture.nativeElement.querySelector('button[name=delete]');
        deleteButton.click();

        fixture.detectChanges();

        const tableRowsAfter = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRowsAfter.length).toBe(2);
    });

    it('should disable update button', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(2);

        tableRows[1].click();
        fixture.detectChanges();

        const updateButton = fixture.nativeElement.querySelector('button[name=update]');
        expect(updateButton.disabled).toBe(true);
    });
});
