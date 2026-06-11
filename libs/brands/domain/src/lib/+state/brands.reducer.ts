import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as BrandsActions from './brands.actions';
import { BrandEntity, BrandSelected } from './brands.models';

export const BRANDS_FEATURE_KEY = 'brands';

export interface BrandsState extends EntityState<BrandEntity> {
  selectedId?: string | number;
  loaded: boolean;
  brandSelectedLoaded: boolean;
  error?: string | null;
  brandSelected: BrandSelected | null;
}

export interface BrandsPartialState {
  readonly [BRANDS_FEATURE_KEY]: BrandsState;
}

export const brandsAdapter: EntityAdapter<BrandEntity> =
  createEntityAdapter<BrandEntity>({
    selectId: (entity) => entity.Make_ID,
    sortComparer: (a, b) => a.Make_Name.localeCompare(b.Make_Name),
  });

export const initialBrandsState: BrandsState = brandsAdapter.getInitialState({
  loaded: false,
  brandSelectedLoaded: false,
  brandSelected: null,
});

const reducer = createReducer(
  initialBrandsState,
  on(BrandsActions.initBrands, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(BrandsActions.loadBrandsSuccess, (state, { brands }) =>
    brandsAdapter.setAll(brands, { ...state, loaded: true }),
  ),
  on(BrandsActions.loadBrandsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(BrandsActions.getBrandByIdSuccess, (state, { vehicleTypes, models }) => ({
    ...state,
    brandSelected: { vehicleTypes, models },
    brandSelectedLoaded: true,
  })),
  on(BrandsActions.getBrandByIdFailure, (state) => ({
    ...state,
    brandSelected: null,
    brandSelectedLoaded: true,
  })),
  on(BrandsActions.getBrandById, (state) => ({
    ...state,
    brandSelectedLoaded: false,
  })),
);

export function brandsReducer(state: BrandsState | undefined, action: Action) {
  return reducer(state, action);
}
