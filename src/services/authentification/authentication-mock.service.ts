import { inject, Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AuthState } from '../../state/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationMockService implements AuthenticationService {
  private appState: AuthState = inject(AuthState);

  public init(): void {
    console.log('Using mock authentification service');
    this.appState.setIsLoggedIn(true);
    this.appState.setUserName('Max Mustermann');
    this.appState.setUserRoles(['viewer', 'manager']);
  }

  public logout(): void {
    this.appState.setIsLoggedIn(false);
    this.appState.setUserName('');
    this.appState.setUserRoles([]);
  }
}
