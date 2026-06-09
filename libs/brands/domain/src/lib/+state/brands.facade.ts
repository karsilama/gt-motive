import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as BrandsSelectors from './brands.selectors';

@Injectable()
export class BrandsFacade {
  private readonly store = inject(Store);

  /**
   * Expose slices as Signals through the facade.
   */
  public loaded = this.store.selectSignal(BrandsSelectors.selectBrandsLoaded);
  public allBrands = this.store.selectSignal(BrandsSelectors.selectAllBrands);
  public selectedBrands = this.store.selectSignal(BrandsSelectors.selectEntity);
}
