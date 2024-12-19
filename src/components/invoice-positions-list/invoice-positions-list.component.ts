import { Component, computed, inject, Input, signal, WritableSignal } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { TranslatePipe } from '@ngx-translate/core';
import { InvoicePosition } from '../../models/invoice-position.model';
import { Unit } from '../../models/unit';
import { InvoicePositionFacade } from '../../services/invoice-position/invoice-position-facade.service';
import { AuthState } from '../../state/auth-state.service';
import { DropdownModule } from 'primeng/dropdown';
import { TitleCasePipe } from '@angular/common';
import { DropdownItem } from '../../commons/dropdown-item';
import { InvoiceFacade } from '../../services/invoice/invoice-facade.service';
import { Invoice } from '../../models/invoice.model';
import { Router } from '@angular/router';

@Component({
    selector: 'im-invoice-positions-list',
    standalone: true,
    imports: [ButtonDirective, FormsModule, InputTextModule, TableModule, TranslatePipe, DropdownModule],
    templateUrl: './invoice-positions-list.component.html',
    styleUrl: './invoice-positions-list.component.scss',
})
export class InvoicePositionsListComponent {
    protected invoicePositionFacade = inject(InvoicePositionFacade);
    private invoiceFacade = inject(InvoiceFacade);
    protected authState = inject(AuthState);
    private router = inject(Router);

    private invoiceId: number | undefined;
    private readonly invoice = signal<Invoice | undefined>(undefined)

    @Input() set id(value: number) {
        if (!value || isNaN(value)) {
            this.router.navigate(['/invoices']);
        }
        this.invoiceId = value;
        this.selectedEntity().invoice = value;
        this.invoicePositionFacade.loadInvoicePositions(value);
        this.invoiceFacade.loadInvoices();
        this.invoice.set(this.invoiceFacade.getInvoiceById(value));
    }

    protected readonly selectedEntity: WritableSignal<InvoicePosition> = signal({
        id: undefined,
        description: '',
        pricePerUnitInCents: 0,
        quantity: 0,
        unit: Unit.PIECE,
        invoice: undefined,
    });

    selectEntity(event: TableRowSelectEvent) {
        this.selectedEntity.set({ ...event.data, invoice: this.invoiceId });
    }

    unselectEntity() {
        this.selectedEntity.set({
            id: undefined,
            description: '',
            pricePerUnitInCents: 0,
            quantity: 0,
            unit: Unit.PIECE,
            invoice: undefined,
        });
    }

    unitOptions = computed(() => {
        const titleCasePipe = new TitleCasePipe();
        return Object.values(Unit).map((value) => ({ value: titleCasePipe.transform(value), key: value }));
    });

    protected currentSelectedUnit = computed(() => {
        return this.unitOptions().find((option) => option.key === this.selectedEntity().unit);
    });

    protected canNotBeModified = computed(() => {
        const paid = this.invoice()?.paid;
        return paid;
    })

    protected setUnitFromDropDown($event: DropdownItem) {
        switch ($event.key) {
            case 'HOUR':
                this.selectedEntity().unit = Unit.HOUR;
                break;
            case 'PD':
                this.selectedEntity().unit = Unit.PD;
                break;
            default:
                this.selectedEntity().unit = Unit.PIECE;
        }
    }

    async createInvoicePosition(invoicePosition: InvoicePosition) {
        this.invoicePositionFacade.createInvoicePosition(invoicePosition);
        this.unselectEntity();
    }

    async updateInvoicePosition(invoicePosition: InvoicePosition) {
        if (invoicePosition.id) {
            this.invoicePositionFacade.updateInvoicePosition(invoicePosition.id, invoicePosition);
        }
        this.unselectEntity();
    }

    deleteInvoicePosition(invoicePosition: InvoicePosition) {
        if (invoicePosition.id) {
            this.invoicePositionFacade.deleteInvoicePosition(invoicePosition.id);
        }
        this.unselectEntity();
    }
}
