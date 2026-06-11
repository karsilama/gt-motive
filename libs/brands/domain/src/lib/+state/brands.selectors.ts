import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BRANDS_FEATURE_KEY,
  BrandsState,
  brandsAdapter,
} from './brands.reducer';

// Lookup the 'Brands' feature state managed by NgRx
export const selectBrandsState =
  createFeatureSelector<BrandsState>(BRANDS_FEATURE_KEY);

const { selectAll, selectEntities } = brandsAdapter.getSelectors();

export const selectBrandsLoaded = createSelector(
  selectBrandsState,
  (state: BrandsState) => state.loaded,
);

export const selectBrandSelectedLoaded = createSelector(
  selectBrandsState,
  (state: BrandsState) => state.brandSelectedLoaded,
);

export const selectBrandsError = createSelector(
  selectBrandsState,
  (state: BrandsState) => state.error,
);

export const selectAllBrands = createSelector(
  selectBrandsState,
  (state: BrandsState) => selectAll(state),
);

export const selectBrandsEntities = createSelector(
  selectBrandsState,
  (state: BrandsState) => selectEntities(state),
);

export const selectSelectedId = createSelector(
  selectBrandsState,
  (state: BrandsState) => state.selectedId,
);

export const selectEntity = createSelector(
  selectBrandsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);

export const selectBrandSelected = createSelector(
  selectBrandsState,
  (state: BrandsState) => state.brandSelected,
);
