import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTemplateListComponent } from './invoice-template-list.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { InvoiceTemplateService } from '../../services/invoice-template/invoice-template.service';
import { DefaultInvoiceTemplateService } from '../../services/invoice-template/default-invoice-template.service';
import { AuthState } from '../../state/auth-state.service';
import { FileService } from '../../services/file/file.service';
import { DefaultFileService } from '../../services/file/default-file.service';
import { provideHttpClient } from '@angular/common/http';

describe('InvoiceTemplateListComponent', () => {
    let component: InvoiceTemplateListComponent;
    let fixture: ComponentFixture<InvoiceTemplateListComponent>;
    let authState: AuthState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InvoiceTemplateListComponent],
            providers: [
                provideAnimations(),
                MessageService,
                TranslateService,
                {
                    provide: InvoiceTemplateService,
                    useClass: DefaultInvoiceTemplateService,
                },
                {
                  provide: FileService,
                  useClass: DefaultFileService
                },
                importProvidersFrom(TranslateModule.forRoot()),
                provideHttpClient()
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(InvoiceTemplateListComponent);
        component = fixture.componentInstance;
        authState = TestBed.inject(AuthState);
        authState.setUserRoles(['manager', 'viewer']);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the invoice template list', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(2);
    });

    it('should create new invoice template', () => {
        const nameInput = fixture.nativeElement.querySelector('#name');
        nameInput.value = 'New Invoice Template';
        nameInput.dispatchEvent(new Event('input'));

        const marginTopFirstInput = fixture.nativeElement.querySelector('#firstTop');
        marginTopFirstInput.value = '10';
        marginTopFirstInput.dispatchEvent(new Event('input'));

        const marginBottomFirstInput = fixture.nativeElement.querySelector('#firstBottom');
        marginBottomFirstInput.value = '10';
        marginBottomFirstInput.dispatchEvent(new Event('input'));

        const marginTopOtherInput = fixture.nativeElement.querySelector('#otherTop');
        marginTopOtherInput.value = '10';
        marginTopOtherInput.dispatchEvent(new Event('input'));

        const marginBottomOtherInput = fixture.nativeElement.querySelector('#otherBottom');
        marginBottomOtherInput.value = '10';
        marginBottomOtherInput.dispatchEvent(new Event('input'));

        const createButton = fixture.nativeElement.querySelector('button[name="create"]');
        createButton.click();
        fixture.detectChanges();

        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(3);
    });

    it('should delete invoice template', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(2);
        tableRows[0].click();
        fixture.detectChanges();

        const deleteButton = fixture.nativeElement.querySelector('button[name="delete"]');
        deleteButton.click();
        fixture.detectChanges();

        const tableRowsAfterDelete = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRowsAfterDelete.length).toBe(1);
    });

    it('should edit invoice template', () => {
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRows.length).toBe(2);
        tableRows[0].click();
        fixture.detectChanges();

        const nameInput = fixture.nativeElement.querySelector('#name');
        nameInput.value = 'Updated Invoice Template';
        nameInput.dispatchEvent(new Event('input'));

        const marginTopFirstInput = fixture.nativeElement.querySelector('#firstTop');
        marginTopFirstInput.value = '20';
        marginTopFirstInput.dispatchEvent(new Event('input'));

        const marginBottomFirstInput = fixture.nativeElement.querySelector('#firstBottom');
        marginBottomFirstInput.value = '20';
        marginBottomFirstInput.dispatchEvent(new Event('input'));

        const marginTopOtherInput = fixture.nativeElement.querySelector('#otherTop');
        marginTopOtherInput.value = '20';
        marginTopOtherInput.dispatchEvent(new Event('input'));

        const marginBottomOtherInput = fixture.nativeElement.querySelector('#otherBottom');
        marginBottomOtherInput.value = '20';
        marginBottomOtherInput.dispatchEvent(new Event('input'));

        const updateButton = fixture.nativeElement.querySelector('button[name="update"]');
        updateButton.click();
        fixture.detectChanges();

        const tableRowsAfterUpdate = fixture.nativeElement.querySelectorAll('tbody > tr');
        expect(tableRowsAfterUpdate.length).toBe(2);
    });
});
