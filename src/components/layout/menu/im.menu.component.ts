import { Component, OnInit } from '@angular/core';
import { ImMenuitemComponent } from '../menuitem/im.menuitem.component';
import { LayoutService } from '../services/im.layout.service';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'im-menu',
  templateUrl: './im.menu.component.html',
  standalone: true,
  imports: [ImMenuitemComponent],
})
export class IMMenuComponent implements OnInit {

    menuItems: MenuItem[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.menuItems = [
            {
                label: '',
                // routerLink: ['/dashboard'],
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard'],

                    },
                    {
                        label: 'Invoices',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/invoices'],
                    },
                    {
                        label: 'Customer',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/customer'],
                    },
                    {
                        label: 'Taxes',
                        icon: 'pi pi-fw pi-money-bill',
                        routerLink: ['/sales-taxes'],
                    }
                ]
            }
        ];
    }
}
