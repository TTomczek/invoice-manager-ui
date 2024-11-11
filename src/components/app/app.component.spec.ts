import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthentificationMockService } from '../../service/authentification/authentification-mock.service';
import { AuthentificationService } from '../../service/authentification/authentification.service';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: AuthentificationService,
          useClass: AuthentificationMockService,
        },
        provideOAuthClient(),
        provideHttpClient(),
      ]
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome invoice-manager-ui'
    );
  });

  it(`should have as title 'invoice-manager-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('invoice-manager-ui');
  });
});
