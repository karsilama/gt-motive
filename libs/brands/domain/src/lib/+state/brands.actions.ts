import { createAction, props } from '@ngrx/store';
import { BrandEntity } from './brands.models';

export const initBrands = createAction('[Brands Page] Init');

export const loadBrandsSuccess = createAction(
  '[Brands/API] Load Brands Success',
  props<{ brands: BrandEntity[] }>(),
);

export const loadBrandsFailure = createAction(
  '[Brands/API] Load Brands Failure',
  props<{ error: any }>(),
);
