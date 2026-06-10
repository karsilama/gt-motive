import { createAction, props } from '@ngrx/store';
import { BrandEntity, ModelResult, VehicleTypeResult } from './brands.models';

export const initBrands = createAction('[Brands Page] Init');

export const getBrandById = createAction(
  '[Brands Page] Get brand by id',
  props<{ Make_ID: string }>(),
);

export const getBrandByIdSuccess = createAction(
  '[Brands/API] Get Brands by ID Success',
  props<{
    Make_ID: string;
    vehicleTypes: VehicleTypeResult[];
    models: ModelResult[];
  }>(),
);

export const getBrandByIdFailure = createAction(
  '[Brands/API] Get Brands by ID Failure',
  props<{ error: any }>(),
);

export const loadBrandsSuccess = createAction(
  '[Brands/API] Load Brands Success',
  props<{ brands: BrandEntity[] }>(),
);

export const loadBrandsFailure = createAction(
  '[Brands/API] Load Brands Failure',
  props<{ error: any }>(),
);
