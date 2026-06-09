import { InjectionToken } from '@angular/core';

export interface ApiConfiguration {
  url?: string;
  [key: string]: unknown;
}

export interface BaseConfiguration {
  api: ApiConfiguration;
}

export const BASE_CONFIGURATION = new InjectionToken<BaseConfiguration>(
  'base-configuration',
);
