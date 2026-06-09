import { inject, Injectable } from '@angular/core';
import {
  BASE_CONFIGURATION,
  BaseConfiguration,
} from '@configuration/infrastructure';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private baseConfiguration = inject(BASE_CONFIGURATION);

  /***
   *  Get base configuration api url by modules
   * @returns {BaseConfiguration}
   * */
  public getBaseConfiguration(): BaseConfiguration {
    return this.baseConfiguration;
  }
}
