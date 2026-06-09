import { Action } from '@ngrx/store';

import * as BrandsActions from './brands.actions';
import { BrandEntity } from './brands.models';
import {
  brandsReducer,
  BrandsState,
  initialBrandsState,
} from './brands.reducer';

describe('Brands Reducer', () => {
  const createBrandEntity = (
    Make_ID: string,
    Make_Name: string,
  ): BrandEntity => ({
    Make_ID,
    Make_Name,
  });

  describe('valid Brands actions', () => {
    it('loadBrandsSuccess should return the list of known Brands', () => {
      const brands = [
        createBrandEntity('12345', 'PRODUCT-AAA'),
        createBrandEntity('12346', 'PRODUCT-zzz'),
      ];
      const action = BrandsActions.loadBrandsSuccess({ brands });

      const result: BrandsState = brandsReducer(initialBrandsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = brandsReducer(initialBrandsState, action);

      expect(result).toBe(initialBrandsState);
    });
  });
});
