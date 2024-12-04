import { Component, computed, inject } from '@angular/core';
import { BusinessPartnerFacadeService } from '../../services/business-partner/business-partner-facade.service';
import { AuthState } from '../../state/auth-state.service';
import { ButtonDirective } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PrimeTemplate } from 'primeng/api';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { TranslatePipe } from '@ngx-translate/core';
import { BusinessPartner } from '../../models/business-partner.model';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
    selector: 'im-business-partners-list',
    standalone: true,
    imports: [
        ButtonDirective,
        FormsModule,
        InputTextModule,
        PaginatorModule,
        PrimeTemplate,
        TableModule,
        TranslatePipe,
        AddressFormComponent,
    ],
    templateUrl: './business-partners-list.component.html',
    styleUrl: './business-partners-list.component.scss',
})
export class BusinessPartnersListComponent {
    protected businessPartnerFacade = inject(BusinessPartnerFacadeService);
    private authState = inject(AuthState);

    protected selectedEntity: BusinessPartner = {
        id: undefined,
        name: '',
        description: '',
        invoices: [],
        contactPersons: [],
        address: {
            id: undefined,
            street: '',
            zipCode: '',
            city: '',
            country: '',
            houseNumber: '',
        },
    };

    constructor() {
        this.businessPartnerFacade.loadBusinessPartners();
    }

    protected selectEntity(event: TableRowSelectEvent) {
        this.selectedEntity = { ...event.data };
    }

    protected unselectEntity() {
        this.selectedEntity = {
            id: undefined,
            name: '',
            description: '',
            invoices: [],
            contactPersons: [],
            address: {
                id: undefined,
                street: '',
                zipCode: '',
                city: '',
                country: '',
                houseNumber: '',
            },
        };
    }

    updateBusinessPartner(businessPartner: BusinessPartner) {
        if (businessPartner.id) {
            this.businessPartnerFacade.updateBusinessPartner(businessPartner.id, businessPartner);
        }
        this.unselectEntity();
    }

    deleteBusinessPartner(businessPartner: BusinessPartner) {
        if (businessPartner.id) {
            this.businessPartnerFacade.deleteBusinessPartner(businessPartner.id);
        }
        this.unselectEntity();
    }

    createBusinessPartner(businessPartner: BusinessPartner) {
        console.log(businessPartner);
        this.businessPartnerFacade.createBusinessPartner(businessPartner);
        this.unselectEntity();
    }

    userCanEdit = computed(() => {
        return this.authState.getUserRoles().includes('manager');
    });
}
