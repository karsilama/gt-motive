import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { BASE_CONFIGURATION } from '@configuration/infrastructure';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: BASE_CONFIGURATION,
      useValue: environment.baseConfig,
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideStore(),
    provideEffects([]),
    provideStoreDevtools({
      maxAge: 25,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
