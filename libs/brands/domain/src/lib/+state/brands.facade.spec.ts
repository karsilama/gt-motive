import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import * as BrandsActions from './brands.actions';
import { BrandsEffects } from './brands.effects';
import { BrandsFacade } from './brands.facade';
import { BrandEntity } from './brands.models';
import {
  BRANDS_FEATURE_KEY,
  brandsReducer,
  BrandsState,
} from './brands.reducer';

interface TestSchema {
  brands: BrandsState;
}

describe('BrandsFacade', () => {
  let facade: BrandsFacade;
  let store: Store<TestSchema>;
  const createBrandEntity = (id: string, name = ''): BrandEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(BRANDS_FEATURE_KEY, brandsReducer),
          EffectsModule.forFeature([BrandsEffects]),
        ],
        providers: [BrandsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(BrandsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await firstValueFrom(facade.allBrands$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await firstValueFrom(facade.allBrands$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadBrandsSuccess` to manually update list
     */
    it('allBrands$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allBrands$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        BrandsActions.loadBrandsSuccess({
          brands: [createBrandEntity('AAA'), createBrandEntity('BBB')],
        }),
      );

      list = await firstValueFrom(facade.allBrands$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
