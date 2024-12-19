import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePositionsListComponent } from './invoice-positions-list.component';
import { InvoicePositionService } from '../../services/invoice-position/invoice-position.service';
import { DefaultInvoicePositionService } from '../../services/invoice-position/default-invoice-position.service';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { DefaultInvoiceService } from '../../services/invoice/default-invoice.service';
import { AuthState } from '../../state/auth-state.service';
import { MessageService } from 'primeng/api';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FileService } from '../../services/file/file.service';
import { DefaultFileService } from '../../services/file/default-file.service';

describe('InvoicePositionsListComponent', () => {
    let component: InvoicePositionsListComponent;
    let fixture: ComponentFixture<InvoicePositionsListComponent>;
    let authState: AuthState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InvoicePositionsListComponent],
            providers: [
                {
                    provide: InvoicePositionService,
                    useClass: DefaultInvoicePositionService,
                },
                {
                    provide: InvoiceService,
                    useClass: DefaultInvoiceService,
                },
                {
                    provide: FileService,
                    useClass: DefaultFileService,
                },
                MessageService,
                TranslateService,
                importProvidersFrom(TranslateModule.forRoot()),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(InvoicePositionsListComponent);
        component = fixture.componentInstance;
        authState = TestBed.inject(AuthState);
        authState.setUserRoles(['manager', 'viewer']);
        component.id = 1;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create invoice', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(1);

        const descriptionInput = fixture.nativeElement.querySelector('input[name="description"]');
        descriptionInput.value= 'Test description';
        descriptionInput.dispatchEvent(new Event('input'));

        const quantityInput = fixture.nativeElement.querySelector('input[name="quantity"]');
        quantityInput.value = 1;
        quantityInput.dispatchEvent(new Event('input'));

        const priceInput = fixture.nativeElement.querySelector('input[name="price"]');
        priceInput.value = 1;
        priceInput.dispatchEvent(new Event('input'));

        const unitSelect = fixture.nativeElement.querySelector('#unit');
        unitSelect.value = 2;
        unitSelect.dispatchEvent(new Event('change'));

        const addButton = fixture.nativeElement.querySelector('button[name="create"]');
        addButton.click();
        fixture.detectChanges();

        const tableRowsAfter = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRowsAfter.length).toBe(2);

        expect(tableRowsAfter[1].textContent).toContain('Test description1PIECE1');
    });

    it('should delete invoice', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(1);

        tableRows[0].click();
        fixture.detectChanges();

        const deleteButton = fixture.nativeElement.querySelector('button[name="delete"]');
        deleteButton.click();
        fixture.detectChanges();

        const tableRowsAfter = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRowsAfter.length).toBe(0);
    });

    it('should not delete invoice', () => {
        component.id = 2;
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(1);

        tableRows[0].click();
        fixture.detectChanges();

        const deleteButton = fixture.nativeElement.querySelector('button[name="delete"]');
        expect(deleteButton.disabled).toBe(true);
    });

    it('should update position', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(1);

        tableRows[0].click();
        fixture.detectChanges();

        const descriptionInput = fixture.nativeElement.querySelector('input[name="description"]');
        descriptionInput.value = 'Test description updated';
        descriptionInput.dispatchEvent(new Event('input'));

        const quantityInput = fixture.nativeElement.querySelector('input[name="quantity"]');
        quantityInput.value = 2;
        quantityInput.dispatchEvent(new Event('input'));

        const priceInput = fixture.nativeElement.querySelector('input[name="price"]');
        priceInput.value = 2;
        priceInput.dispatchEvent(new Event('input'));

        const unitSelect = fixture.nativeElement.querySelector('#unit');
        unitSelect.value = 2;
        unitSelect.dispatchEvent(new Event('change'));

        const updateButton = fixture.nativeElement.querySelector('button[name="update"]');
        updateButton.click();
        fixture.detectChanges();

        const tableRowsAfter = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRowsAfter.length).toBe(1);

        expect(tableRowsAfter[0].textContent).toContain('Test description updated2PIECE2');
    });
});
