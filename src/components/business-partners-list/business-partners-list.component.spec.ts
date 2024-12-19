import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartnersListComponent } from './business-partners-list.component';
import { BusinessPartnerService } from '../../services/business-partner/business-partner.service';
import { DefaultBusinessPartnerService } from '../../services/business-partner/default-business-partner.service';
import { AuthState } from '../../state/auth-state.service';
import { MessageService } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';

describe('BusinessPartnersListComponent', () => {
    let component: BusinessPartnersListComponent;
    let fixture: ComponentFixture<BusinessPartnersListComponent>;
    let authState: AuthState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BusinessPartnersListComponent],
            providers: [
                {
                    provide: BusinessPartnerService,
                    useClass: DefaultBusinessPartnerService,
                },
                MessageService,
                TranslateService,
                importProvidersFrom(TranslateModule.forRoot()),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BusinessPartnersListComponent);
        component = fixture.componentInstance;
        authState = TestBed.inject(AuthState);
        authState.setUserRoles(['manager', 'viewer']);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create businesspartner', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(2);

        const nameInput = fixture.nativeElement.querySelector('input[name="name"]');
        nameInput.value = 'Test';
        nameInput.dispatchEvent(new Event('input'));

        const descriptionInput = fixture.nativeElement.querySelector('input[name="description"]');
        descriptionInput.value = 'Test';
        descriptionInput.dispatchEvent(new Event('input'));

        const createButton = fixture.nativeElement.querySelector('button[name=create]');
        createButton.click();

        fixture.detectChanges();

        const tableRowsAfter = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRowsAfter.length).toBe(3);
    });

    it('should disable delete button', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(2);

        tableRows[0].click();
        fixture.detectChanges();

        const deleteButton = fixture.nativeElement.querySelector('button[name=delete]');
        expect(deleteButton.disabled).toBe(true);
    });

    it('should delete businesspartner', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(2);

        tableRows[1].click();
        fixture.detectChanges();

        const deleteButton = fixture.nativeElement.querySelector('button[name=delete]');
        deleteButton.click();

        fixture.detectChanges();

        const tableRowsAfter = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRowsAfter.length).toBe(1);
    });

    it('should update businesspartner', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(2);

        tableRows[0].click();
        fixture.detectChanges();

        const nameInput = fixture.nativeElement.querySelector('input[name="name"]');
        nameInput.value = 'name';
        nameInput.dispatchEvent(new Event('input'));

        const descriptionInput = fixture.nativeElement.querySelector('input[name="description"]');
        descriptionInput.value = 'description';
        descriptionInput.dispatchEvent(new Event('input'));

        const streetInput = fixture.nativeElement.querySelector('input[name="street"]');
        streetInput.value = 'street';
        streetInput.dispatchEvent(new Event('input'));

        const cityInput = fixture.nativeElement.querySelector('input[name="city"]');
        cityInput.value = 'city';
        cityInput.dispatchEvent(new Event('input'));

        const postalCodeInput = fixture.nativeElement.querySelector('input[name="zipcode"]');
        postalCodeInput.value = '55667';
        postalCodeInput.dispatchEvent(new Event('input'));

        const countryInput = fixture.nativeElement.querySelector('input[name="country"]');
        countryInput.value = 'USA';
        countryInput.dispatchEvent(new Event('input'));

        const updateButton = fixture.nativeElement.querySelector('button[name=update]');
        updateButton.click();

        fixture.detectChanges();

        const tableRowsAfter = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRowsAfter.length).toBe(2);

        const textContent = tableRowsAfter[0].textContent;
        expect(textContent).toContain('namedescriptionstreet 1cityUSA');
    });
});
