import { Component, computed, inject } from '@angular/core';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { TranslatePipe } from '@ngx-translate/core';
import { SalesTaxFacade } from '../../services/sales-tax/sales-tax-facade.service';
import { SalesTax } from '../../models/sales-tax.model';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { AuthState } from '../../state/app-state.service';

@Component({
    selector: 'im-sales-tax-list',
    standalone: true,
    imports: [TableModule, TranslatePipe, FormsModule, InputTextModule, ButtonDirective],
    templateUrl: './sales-tax-list.component.html',
    styleUrl: './sales-tax-list.component.css',
})
export class SalesTaxListComponent {
    protected salesTaxFacade = inject(SalesTaxFacade);
    private authState = inject(AuthState);

    protected selectedEntity: SalesTax = {
        id: undefined,
        name: '',
        rate: 0,
    };

    constructor() {
        this.salesTaxFacade.loadSalesTaxes();
    }

    protected selectEntity(event: TableRowSelectEvent) {
        this.selectedEntity = { ...event.data };
    }

    protected unselectEntity() {
        this.selectedEntity = {
            id: undefined,
            name: '',
            rate: 0,
        };
    }

    updateSalesTax(salesTax: SalesTax) {
        if (salesTax.id) {
            this.salesTaxFacade.updateSalesTax(salesTax.id, salesTax);
        }
        this.unselectEntity();
    }

    deleteSalesTax(salesTax: SalesTax) {
        if (salesTax.id) {
            this.salesTaxFacade.deleteSalesTax(salesTax.id);
        }
        this.unselectEntity();
    }

    createSalesTax(salesTax: SalesTax) {
        this.salesTaxFacade.createSalesTax(salesTax);
        this.unselectEntity();
    }

    userCanEdit = computed(() => {
        return this.authState.getUserRoles().includes('manager');
    });
}
