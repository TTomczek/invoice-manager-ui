import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './components/app/app.config';
import { IMAppComponent } from './components/app/app.component';

bootstrapApplication(IMAppComponent, appConfig).catch((err) =>
  console.error(err)
);
