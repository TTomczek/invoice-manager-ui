import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Button } from 'primeng/button';
import { AuthentificationService } from '../../service/authentification/authentification.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    TableModule,
    MenubarModule,
    Button,
    CommonModule
  ],
  selector: 'im-app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class IMAppComponent {
  title = 'invoice-manager-ui';

  private oauthService: OAuthService = inject(OAuthService);
  private authentificationService: AuthentificationService = inject(AuthentificationService);
  private primeNgConfig: PrimeNGConfig = inject(PrimeNGConfig);

  constructor() {
    this.primeNgConfig.ripple = true;
    this.authentificationService.init();
  }

  logout() {
    this.oauthService.logOut();
  }

  protected menubarItems: MenuItem[] = [
    {
      label: 'Rechnungen',
      icon: 'pi pi-receipt',
      routerLink: '/invoices',
    },
    {
      label: 'Geschäftspartner',
      icon: 'pi pi-briefcase',
    },
    {
      label: 'Ansprechpartner',
      icon: 'pi pi-id-card',
    },
    {
      icon: 'pi pi-person',
    },
  ];
}
