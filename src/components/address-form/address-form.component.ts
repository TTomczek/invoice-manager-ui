import { Component, effect, input, model, output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TranslatePipe } from '@ngx-translate/core';
import { Address } from '../../models/address.model';

@Component({
    selector: 'im-address-form',
    standalone: true,
    imports: [InputTextModule, PaginatorModule, TranslatePipe],
    templateUrl: './address-form.component.html',
    styleUrl: './address-form.component.scss',
})
export class AddressFormComponent {

    address = input<Address>();
    addressChange = output<Address>();

    protected entity: Address = {
        id: undefined,
        street: '',
        zipCode: '',
        city: '',
        country: '',
        houseNumber: '',
    }

    constructor() {
        effect(() => {
            const address = this.address();
            if (address) {
                this.entity = { ...address };
            } else {
                this.entity = {
                    id: undefined,
                    street: '',
                    zipCode: '',
                    city: '',
                    country: '',
                    houseNumber: '',
                }
            }
        });
    }

    setStreet(event: string) {
        this.entity.street = event;
        this.addressChange.emit(this.entity);
    }

    setHouseNumber(event: string) {
        this.entity.houseNumber = event;
        this.addressChange.emit(this.entity);
    }

    setZipCode(event: string) {
        this.entity.zipCode = event;
        this.addressChange.emit(this.entity);
    }

    setCity(event: string) {
        this.entity.city = event;
        this.addressChange.emit(this.entity);
    }

    setCountry(event: string) {
        this.entity.country = event;
        this.addressChange.emit(this.entity);
    }
}
