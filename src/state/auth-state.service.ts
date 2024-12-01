import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  private isLoggedIn = signal(false);
  private userName = signal('');
  private userRoles = signal<string[]>([]);

  public getIsLoggedIn = this.isLoggedIn.asReadonly();
  public getUserName = this.userName.asReadonly();
  public getUserRoles = this.userRoles.asReadonly();

  public setIsLoggedIn(value: boolean) {
    this.isLoggedIn.set(value);
  }

  public setUserName(value: string) {
    this.userName.set(value);
  }

  public setUserRoles(value: string[]) {
    this.userRoles.set(value);
  }
}
