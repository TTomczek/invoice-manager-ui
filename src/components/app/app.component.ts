import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { PrimeNGConfig, TranslationKeys } from 'primeng/api';
import { Button } from 'primeng/button';
import { AuthenticationService } from '../../services/authentification/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import translationDE from '../../../public/i18n/de.json';
import translationEN from '../../../public/i18n/en.json';
import { ToastModule } from 'primeng/toast';
import { LanguageService } from '../../services/language.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { sign } from 'chart.js/helpers';
import { Subscription } from 'rxjs';

@Component({
    standalone: true,
    imports: [RouterModule, TableModule, MenubarModule, Button, ToastModule],
    selector: 'im-app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class IMAppComponent {
    title = 'invoice-manager-ui';
    private translateService: TranslateService = inject(TranslateService);

    private authenticationService: AuthenticationService = inject(AuthenticationService);
    private primeNgConfig: PrimeNGConfig = inject(PrimeNGConfig);

    constructor() {
        this.primeNgConfig.ripple = true;
        this.authenticationService.init();
        this.translateService.setTranslation('de', translationDE);
        this.translateService.setTranslation('en', translationEN);
        this.translateService.setDefaultLang('de');
        this.translateService.use('de');
    }
}
