import { inject, Injectable } from '@angular/core';
import { AuthentificationService } from './authentification.service';
import { AppState } from '../../state/app-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationMockService implements AuthentificationService {
  private appState: AppState = inject(AppState);

  public init(): void {
    console.log('Using mock authentification service');
    this.appState.setIsLoggedIn(true);
    this.appState.setUserName('Max Mustermann');
    this.appState.setUserRoles(['viewer', 'manager']);
  }
}
