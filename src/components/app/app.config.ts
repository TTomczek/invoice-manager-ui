import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthentificationService } from '../../service/authentification/authentification.service';
import { environment } from '../../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withHashLocation()),
    provideOAuthClient(),
    provideHttpClient(),
    provideAnimations(),
    {
      provide: AuthentificationService,
      useClass: environment.authentificationProvider
    }
  ]
};
