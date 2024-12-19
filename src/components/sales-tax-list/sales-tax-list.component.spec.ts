import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTaxListComponent } from './sales-tax-list.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideIMServices } from '../app/app.config';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';

describe('SalesTaxListComponent', () => {
    let component: SalesTaxListComponent;
    let fixture: ComponentFixture<SalesTaxListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SalesTaxListComponent],
            providers: [
                provideAnimations(),
                provideIMServices(),
                provideHttpClient(),
                MessageService,
                TranslateService,
                importProvidersFrom(TranslateModule.forRoot())
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SalesTaxListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the sales tax list', () => {
        const tableRows = fixture.nativeElement.querySelectorAll('tr');
        expect(tableRows.length).toBe(1);
    });

    it('should create new sales tax', () => {
        const nameInput = fixture.nativeElement.querySelector('input[name="name"]');
        nameInput.value = 'New Sales Tax';
        nameInput.dispatchEvent(new Event('input'));

        const rateInput = fixture.nativeElement.querySelector('input[name="rate"]');
        rateInput.value = '19';
        rateInput.dispatchEvent(new Event('input'));

        const createButton = fixture.nativeElement.querySelector('button[name="create"]');
        createButton.click();

        const tableRows = fixture.nativeElement.querySelectorAll('tr');
        expect(tableRows.length).toBe(2);


    });

    it('should delete sales tax', () => {

    });

    it('should update sales tax', () => {

    });
});
