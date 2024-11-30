import { TestBed } from '@angular/core/testing';
import { IMAppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthenticationMockService } from '../../services/authentification/authentication-mock.service';
import { AuthenticationService } from '../../services/authentification/authentication.service';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IMAppComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: AuthenticationService,
          useClass: AuthenticationMockService,
        },
        provideOAuthClient(),
        provideHttpClient(),
      ]
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(IMAppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome invoice-manager-ui'
    );
  });

  it(`should have as title 'invoice-manager-ui'`, () => {
    const fixture = TestBed.createComponent(IMAppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('invoice-manager-ui');
  });
});
