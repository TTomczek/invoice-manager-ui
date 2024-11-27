import { AuthenticationMockService } from '../services/authentification/authentication-mock.service';
import { DefaultSalesTaxService } from '../services/sales-tax/default-sales-tax.service';

export const environment = {
  production: false,
  authenticationProvider: AuthenticationMockService,
  apiBaseUrl: 'http://localhost:8080',
  salesTaxService: DefaultSalesTaxService,
};
