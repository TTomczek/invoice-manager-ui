import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTaxListComponent } from './sales-tax-list.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { AuthState } from '../../state/auth-state.service';
import { SalesTaxService } from '../../services/sales-tax/sales-tax.service';
import { DefaultSalesTaxService } from '../../services/sales-tax/default-sales-tax.service';

describe('SalesTaxListComponent', () => {
    let component: SalesTaxListComponent;
    let fixture: ComponentFixture<SalesTaxListComponent>;
    let authState: AuthState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SalesTaxListComponent],
            providers: [
                provideAnimations(),
                MessageService,
                TranslateService,
                {
                    provide: SalesTaxService,
                    useClass: DefaultSalesTaxService
                },
                importProvidersFrom(TranslateModule.forRoot())
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SalesTaxListComponent);
        component = fixture.componentInstance;
        authState = TestBed.inject(AuthState);
        authState.setUserRoles(['manager', 'viewer'])
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the sales tax list', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(4);
    });

    it('should create new sales tax', () => {
        const nameInput = fixture.nativeElement.querySelector('#name');
        nameInput.value = 'New Sales Tax';
        nameInput.dispatchEvent(new Event('input'));

        const rateInput = fixture.nativeElement.querySelector('#rate');
        rateInput.value = '19';
        rateInput.dispatchEvent(new Event('input'));

        const createButton = fixture.nativeElement.querySelector('button[name="create"]');
        createButton.click();
        fixture.detectChanges()

        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(5);
    });

    it('should delete sales tax', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(4);
        tableRows[1].click();
        fixture.detectChanges();

        const deleteButton = fixture.nativeElement.querySelector('button[name="delete"]');
        deleteButton.click();
        fixture.detectChanges();

        const newTableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(newTableRows.length).toBe(3);
    });

    it('should update sales tax', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(4);
        tableRows[1].click();
        fixture.detectChanges();

        const nameInput = fixture.nativeElement.querySelector('#name');
        nameInput.value = 'Updated Sales Tax';
        nameInput.dispatchEvent(new Event('input'));

        const rateInput = fixture.nativeElement.querySelector('#rate');
        rateInput.value = '20';
        rateInput.dispatchEvent(new Event('input'));

        const updateButton = fixture.nativeElement.querySelector('button[name="update"]');
        updateButton.click();
        fixture.detectChanges();

        const updatedTableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(updatedTableRows.length).toBe(4);

        const updatedRow = updatedTableRows[1];
        expect(updatedRow.querySelector('td').textContent).toBe('Updated Sales Tax');
        expect(updatedRow.querySelector('td:nth-child(2)').textContent).toBe('20%');
    });
});
