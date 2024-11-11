import { inject, Injectable } from '@angular/core';
import { AuthentificationService } from './authentification.service';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { AppState } from '../../state/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationImplService implements AuthentificationService {
  private oauthService: OAuthService = inject(OAuthService);
  private appState: AppState = inject(AppState);

  private readonly authCodeFlowConfig: AuthConfig = {
    issuer: 'http://localhost:8081/realms/invoice-manager-realm',
    redirectUri: window.location.origin + '/index.html',
    clientId: 'angular-client',
    responseType: 'code',
    scope: 'openid profile email offline_access',
  };

  public init(): void {
    this.oauthService.initCodeFlow();
    this.oauthService.configure(this.authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();
    this.subscribeToLoginEvents();
  }

  private subscribeToLoginEvents() {
    this.oauthService.events.subscribe((event) => {
      switch (event.type) {
        case 'token_expires':
          console.log('Token expires');
          break;
        case 'token_refreshed':
          console.log('Token refreshed');
          break;
        case 'token_received':
          console.log('Token received');
          if (!this.appState.getIsLoggedIn()) {
            this.appState.setIsLoggedIn(true);
            this.appState.setUserName(this.oauthService.getIdentityClaims()['name']);
            this.appState.setUserRoles(this.oauthService.getIdentityClaims()['roles']);
          }
          break;
        case 'discovery_document_loaded':
          console.log('Discovery document loaded');
          break;
      }
    });
  }
}
