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
      expect(result.entities['12345']).toEqual(brands[0]);
      expect(result.entities['12346']).toEqual(brands[1]);
    });

    it('loadBrandsFailure should set error', () => {
      const error = 'Network error';
      const action = BrandsActions.loadBrandsFailure({ error });

      const result: BrandsState = brandsReducer(initialBrandsState, action);

      expect(result.error).toBe(error);
      expect(result.loaded).toBe(false);
    });

    it('initBrands should reset loaded to false', () => {
      const state = { ...initialBrandsState, loaded: true };
      const action = BrandsActions.initBrands();

      const result: BrandsState = brandsReducer(state, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBeNull();
    });

    it('getBrandById should set brandSelectedLoaded to false', () => {
      const action = BrandsActions.getBrandById({ Make_ID: '440' });

      const result: BrandsState = brandsReducer(initialBrandsState, action);

      expect(result.brandSelectedLoaded).toBe(false);
    });

    it('getBrandByIdSuccess should set brandSelected and brandSelectedLoaded to true', () => {
      const vehicleTypes = [
        { VehicleTypeId: 2, VehicleTypeName: 'Passenger Car' },
      ];
      const models = [
        {
          Make_ID: 440,
          Make_Name: 'ASTON MARTIN',
          Model_ID: 101,
          Model_Name: 'DB9',
        },
      ];
      const action = BrandsActions.getBrandByIdSuccess({
        Make_ID: '440',
        vehicleTypes,
        models,
      });

      const result: BrandsState = brandsReducer(initialBrandsState, action);

      expect(result.brandSelected).toEqual({ vehicleTypes, models });
      expect(result.brandSelectedLoaded).toBe(true);
    });

    it('getBrandByIdFailure should set brandSelected to null and brandSelectedLoaded to true', () => {
      const error = 'API Error';
      const action = BrandsActions.getBrandByIdFailure({ error });

      const result: BrandsState = brandsReducer(initialBrandsState, action);

      expect(result.brandSelected).toBeNull();
      expect(result.brandSelectedLoaded).toBe(true);
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
