import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { LayoutService } from '../services/im.layout.service';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentification/authentication.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'im-topbar',
    templateUrl: './im.topbar.component.html',
    imports: [NgClass, RouterLink, TranslatePipe, DropdownModule, NgOptimizedImage, FormsModule],
    standalone: true,
})
export class IMTopBarComponent {
    items!: MenuItem[];

    private readonly authenticationService = inject(AuthenticationService);
    private readonly translate = inject(TranslateService);
    private readonly primeNgConfig = inject(PrimeNGConfig);

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) {}

    protected signout() {
        this.authenticationService.logout();
    }

    protected languageOptions = [
        { name: 'Deutsch', code: 'de' },
        { name: 'English', code: 'us' },
    ];

    protected selectedLanguage = { ...this.languageOptions[0] };

    protected changeLanguage(langOption: { name: string; code: string }) {
        const lang = {...langOption};
        if (lang.code === 'us') {
            lang.code = 'en';
        }
        this.translate.use(lang.code);
        this.translate.get('primeng').subscribe((res) => { this.primeNgConfig.translation = res; });
        this.selectedLanguage = langOption;
    }
}
