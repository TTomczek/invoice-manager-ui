import { Component, inject } from '@angular/core';
import { TranslatableMessageService } from '../../services/translatable-message.service';
import { TableModule, TableRowSelectEvent, TableRowUnSelectEvent } from 'primeng/table';
import { TranslatePipe } from '@ngx-translate/core';
import { SalesTaxFacade } from '../../services/sales-tax/sales-tax-facade.service';
import { MessagesModule } from 'primeng/messages';
import { SalesTax } from '../../models/sales-tax.model';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'im-sales-tax-list',
  standalone: true,
  imports: [
    TableModule,
    TranslatePipe,
    MessagesModule,
    FormsModule,
    InputTextModule,
    ButtonDirective,
  ],
  templateUrl: './sales-tax-list.component.html',
  styleUrl: './sales-tax-list.component.css',
})
export class SalesTaxListComponent {
  protected salesTaxFacade = inject(SalesTaxFacade);

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
}
