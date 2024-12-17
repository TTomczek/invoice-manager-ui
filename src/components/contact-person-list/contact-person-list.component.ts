import { Component, computed, inject, Input, signal, WritableSignal } from '@angular/core';
import { AddressFormComponent } from '../address-form/address-form.component';
import { ButtonDirective } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PrimeTemplate } from 'primeng/api';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactPersonFacade } from '../../services/contact-person/contact-persons-facade.service';
import { AuthState } from '../../state/auth-state.service';
import { ContactPerson } from '../../models/contact-person.model';
import { Salutation } from '../../models/salutation';
import { DropdownModule } from 'primeng/dropdown';
import { TitleCasePipe } from '@angular/common';
import { DropdownItem } from '../../commons/dropdown-item';

@Component({
    selector: 'im-contact-person-list',
    standalone: true,
    imports: [
        AddressFormComponent,
        ButtonDirective,
        FormsModule,
        InputTextModule,
        PrimeTemplate,
        TableModule,
        TranslatePipe,
        DropdownModule,
    ],
    templateUrl: './contact-person-list.component.html',
    styleUrl: './contact-person-list.component.scss',
})
export class ContactPersonListComponent {
    protected contactPersonFacade: ContactPersonFacade = inject(ContactPersonFacade);
    protected authState = inject(AuthState);

    businessPartnerId: number | undefined;

    @Input() set id(value: number) {
        this.businessPartnerId = value;
        this.selectedEntity().businessPartner = value;
        this.contactPersonFacade.loadContactPersons(value);
    }

    protected readonly selectedEntity: WritableSignal<ContactPerson> = signal({
        id: undefined,
        name: '',
        firstName: '',
        email: '',
        salutation: Salutation.DIVERS,
        businessPartner: undefined,
        address: {
            id: undefined,
            street: '',
            zipCode: '',
            city: '',
            country: '',
            houseNumber: '',
        },
    });

    protected salutationOptions = computed(() => {
        const titleCasePipe = new TitleCasePipe();
        return Object.values(Salutation).map((value) => ({ value: titleCasePipe.transform(value), key: value }));
    });

    protected currentSelectedSalutation = computed(() => {
        return this.salutationOptions().find((option) => option.key === this.selectedEntity().salutation);
    });

    protected setSalutationFromDropDown($event: DropdownItem) {
        switch ($event.key) {
            case 'FRAU':
                this.selectedEntity().salutation = Salutation.FRAU;
                break;
            case 'HERR':
                this.selectedEntity().salutation = Salutation.HERR;
                break;
            default:
                this.selectedEntity().salutation = Salutation.DIVERS;
        }
    }

    protected selectEntity(event: TableRowSelectEvent) {
        this.selectedEntity.set({ ...event.data, businessPartner: this.businessPartnerId });
    }

    protected unselectEntity() {
        this.selectedEntity.set({
            id: undefined,
            name: '',
            firstName: '',
            email: '',
            salutation: Salutation.DIVERS,
            businessPartner: this.businessPartnerId,
            address: {
                id: undefined,
                street: '',
                zipCode: '',
                city: '',
                country: '',
                houseNumber: '',
            },
        });
    }

    createContactPerson(contactPerson: ContactPerson) {
        this.contactPersonFacade.createContactPerson(contactPerson);
        this.unselectEntity();
    }

    updateContactPerson(contactPerson: ContactPerson) {
        if (contactPerson.id) {
            this.contactPersonFacade.updateContactPerson(contactPerson.id, contactPerson);
        }
        this.unselectEntity();
    }

    deleteContactPerson(contactPerson: ContactPerson) {
        if (contactPerson.id) {
            this.contactPersonFacade.deleteContactPerson(contactPerson.id);
        }
        this.unselectEntity();
    }
}
