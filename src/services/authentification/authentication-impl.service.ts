import { inject, Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { AuthState } from '../../state/app-state.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationImplService implements AuthenticationService {
    private oauthService: OAuthService = inject(OAuthService);
    private authState: AuthState = inject(AuthState);

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
                    if (!this.authState.getIsLoggedIn()) {
                        this.authState.setIsLoggedIn(true);
                        this.authState.setUserName(this.oauthService.getIdentityClaims()['name']);
                        this.authState.setUserRoles(this.oauthService.getIdentityClaims()['roles']);
                    }
                    break;
                case 'discovery_document_loaded':
                    console.log('Discovery document loaded');
                    break;
            }
            });
    }

    public logout(): void {
        this.oauthService.logOut();
        this.authState.setIsLoggedIn(false);
        this.authState.setUserName('');
        this.authState.setUserRoles([]);
    }
}
