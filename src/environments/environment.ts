import { AuthenticationImplService } from '../services/authentification/authentication-impl.service';
import { SalesTaxImplService } from '../services/sales-tax/sales-tax-impl.service';

export const environment = {
  production: false,
  authenticationProvider: AuthenticationImplService,
  apiBaseUrl: 'http://localhost:8080',
  salesTaxService: SalesTaxImplService,
};
