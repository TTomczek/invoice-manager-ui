import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPersonListComponent } from './contact-person-list.component';
import { importProvidersFrom } from '@angular/core';
import { ContactPersonService } from '../../services/contact-person/contact-person.service';
import { DefaultContactPersonService } from '../../services/contact-person/default-contact-person.service';
import { MessageService } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthState } from '../../state/auth-state.service';
import { BusinessPartnerService } from '../../services/business-partner/business-partner.service';
import { DefaultBusinessPartnerService } from '../../services/business-partner/default-business-partner.service';

describe('ContactPersonListComponent', () => {
    let component: ContactPersonListComponent;
    let fixture: ComponentFixture<ContactPersonListComponent>;
    let authState: AuthState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContactPersonListComponent],
            providers: [
                {
                    provide: ContactPersonService,
                    useClass: DefaultContactPersonService,
                },
                {
                    provide: BusinessPartnerService,
                    useClass: DefaultBusinessPartnerService,
                },
                MessageService,
                TranslateService,
                importProvidersFrom(TranslateModule.forRoot()),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ContactPersonListComponent);
        component = fixture.componentInstance;
        component.id = 1;
        authState = TestBed.inject(AuthState);
        authState.setUserRoles(['manager', 'viewer']);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create contactperson', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(2);

        const firstNameInput = fixture.nativeElement.querySelector('input[name="firstname"]');
        firstNameInput.value = 'Max';
        firstNameInput.dispatchEvent(new Event('input'));

        const nameInput = fixture.nativeElement.querySelector('input[name="name"]');
        nameInput.value = 'Test';
        nameInput.dispatchEvent(new Event('input'));

        const emailInput = fixture.nativeElement.querySelector('input[name="email"]');
        emailInput.value = 'max@mustermann.org';
        emailInput.dispatchEvent(new Event('input'));

        const salutationInput = fixture.nativeElement.querySelector('#salutation');
        salutationInput.value = 'HERR';
        salutationInput.dispatchEvent(new Event('change'));

        const streetInput = fixture.nativeElement.querySelector('input[name="street"]');
        streetInput.value = 'Musterstraße';
        streetInput.dispatchEvent(new Event('input'));

        const houseNumberInput = fixture.nativeElement.querySelector('input[name="housenumber"]');
        houseNumberInput.value = '1';
        houseNumberInput.dispatchEvent(new Event('input'));

        const zipCodeInput = fixture.nativeElement.querySelector('input[name="zipcode"]');
        zipCodeInput.value = '12345';
        zipCodeInput.dispatchEvent(new Event('input'));

        const cityInput = fixture.nativeElement.querySelector('input[name="city"]');
        cityInput.value = 'Musterstadt';
        cityInput.dispatchEvent(new Event('input'));

        const countryInput = fixture.nativeElement.querySelector('input[name="country"]');
        countryInput.value = 'Deutschland';
        countryInput.dispatchEvent(new Event('input'));

        const createButton = fixture.nativeElement.querySelector('button[name=create]');
        createButton.click();

        fixture.detectChanges();

        const tableRowsAfter = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRowsAfter.length).toBe(3);
    });

    it('should delete position', () => {
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

    it('should update position', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(2);

        tableRows[0].click();
        fixture.detectChanges();

        const firstNameInput = fixture.nativeElement.querySelector('input[name="firstname"]');
        firstNameInput.value = 'Maxi';
        firstNameInput.dispatchEvent(new Event('input'));

        const nameInput = fixture.nativeElement.querySelector('input[name="name"]');
        nameInput.value = 'Mustermanni';
        nameInput.dispatchEvent(new Event('input'));

        const emailInput = fixture.nativeElement.querySelector('input[name="email"]');
        emailInput.value = 'maxi@mustermanni.net';

        const salutationInput = fixture.nativeElement.querySelector('#salutation');
        salutationInput.value = 'FRAU';
        salutationInput.dispatchEvent(new Event('change'));

        const streetInput = fixture.nativeElement.querySelector('input[name="street"]');
        streetInput.value = 'Musterweg';
        streetInput.dispatchEvent(new Event('input'));

        const houseNumberInput = fixture.nativeElement.querySelector('input[name="housenumber"]');
        houseNumberInput.value = '10';
        houseNumberInput.dispatchEvent(new Event('input'));

        const zipCodeInput = fixture.nativeElement.querySelector('input[name="zipcode"]');
        zipCodeInput.value = '45678';
        zipCodeInput.dispatchEvent(new Event('input'));

        const cityInput = fixture.nativeElement.querySelector('input[name="city"]');
        cityInput.value = 'Musterdorf';
        cityInput.dispatchEvent(new Event('input'));

        const countryInput = fixture.nativeElement.querySelector('input[name="country"]');
        countryInput.value = 'GB';
        countryInput.dispatchEvent(new Event('input'));

        const updateButton = fixture.nativeElement.querySelector('button[name=update]');
        updateButton.click();

        fixture.detectChanges();

        const tableRowsAfter = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRowsAfter.length).toBe(2);

        const textContent = tableRowsAfter[0].textContent;
        expect(textContent).toContain('MaxiMustermannimax.mustermann@example.deMusterweg 10MusterdorfGB');
    });
});
