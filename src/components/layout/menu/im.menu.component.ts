import { Component, inject } from '@angular/core';
import { ImMenuitemComponent } from '../menuitem/im.menuitem.component';
import { LayoutService } from '../services/im.layout.service';
import { MenuItem } from './menu-item.model';

@Component({
    selector: 'im-menu',
    templateUrl: './im.menu.component.html',
    standalone: true,
    imports: [ImMenuitemComponent],
})
export class IMMenuComponent {
    private layoutService = inject(LayoutService);

    menuItems: MenuItem[] = [
        {
            label: '',
            items: [
                {
                    label: 'sidebar.items.invoices',
                    icon: 'pi pi-fw pi-file',
                    routerLink: ['/invoices'],
                },
                {
                    label: 'sidebar.items.business-partners',
                    icon: 'pi pi-fw pi-user',
                    routerLink: ['/business-partners'],
                },
                {
                    label: 'sidebar.items.invoice-templates',
                    icon: 'pi pi-fw pi-file-pdf',
                    routerLink: ['/invoice-templates'],
                },
                {
                    label: 'sidebar.items.sales-taxes',
                    icon: 'pi pi-fw pi-money-bill',
                    routerLink: ['/sales-taxes'],
                },
            ],
        },
    ];
}
