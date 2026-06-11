import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BrandEntity, BrandSelected } from './brands.models';
import {
  brandsAdapter,
  BrandsState,
  initialBrandsState,
} from './brands.reducer';
import {
  selectAllBrands,
  selectBrandSelected,
  selectBrandSelectedLoaded,
  selectBrandsEntities,
  selectBrandsError,
  selectBrandsLoaded,
  selectEntity,
  selectSelectedId,
} from './brands.selectors';

describe('Brands Selectors', () => {
  let store: MockStore;
  let state: BrandsState;

  const mockBrands: BrandEntity[] = [
    { Make_ID: '440', Make_Name: 'ASTON MARTIN' },
    { Make_ID: '441', Make_Name: 'TESLA' },
  ];

  const mockBrandSelected: BrandSelected = {
    vehicleTypes: [{ VehicleTypeId: 2, VehicleTypeName: 'Passenger Car' }],
    models: [
      {
        Make_ID: 440,
        Make_Name: 'ASTON MARTIN',
        Model_ID: 101,
        Model_Name: 'DB9',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });

    store = TestBed.inject(Store) as MockStore;
    state = {
      ...brandsAdapter.setAll(mockBrands, initialBrandsState),
      loaded: true,
      brandSelectedLoaded: true,
      error: null,
      selectedId: '440',
      brandSelected: mockBrandSelected,
    };

    store.overrideSelector(selectBrandsLoaded, state.loaded);
    store.overrideSelector(
      selectBrandSelectedLoaded,
      state.brandSelectedLoaded,
    );
    store.overrideSelector(selectBrandsError, state.error);
    store.overrideSelector(selectAllBrands, mockBrands);
    store.overrideSelector(selectBrandsEntities, {
      '440': mockBrands[0],
      '441': mockBrands[1],
    });
    store.overrideSelector(selectSelectedId, '440');
    store.overrideSelector(selectBrandSelected, mockBrandSelected);
    store.refreshState();
  });

  describe('selectBrandsLoaded', () => {
    it('should return the loaded state', () => {
      const result = selectBrandsLoaded.projector(state);
      expect(result).toBe(true);
    });
  });

  describe('selectBrandSelectedLoaded', () => {
    it('should return the brandSelectedLoaded state', () => {
      const result = selectBrandSelectedLoaded.projector(state);
      expect(result).toBe(true);
    });
  });

  describe('selectBrandsError', () => {
    it('should return the error state', () => {
      const errorState = { ...state, error: 'Network error' };
      const result = selectBrandsError.projector(errorState);
      expect(result).toBe('Network error');
    });
  });

  describe('selectAllBrands', () => {
    it('should return all brands', () => {
      const result = selectAllBrands.projector(state);
      expect(result).toEqual(mockBrands);
      expect(result.length).toBe(2);
    });
  });

  describe('selectBrandsEntities', () => {
    it('should return entities dictionary', () => {
      const result = selectBrandsEntities.projector(state);
      expect(result).toEqual({
        '440': mockBrands[0],
        '441': mockBrands[1],
      });
    });
  });

  describe('selectSelectedId', () => {
    it('should return selectedId', () => {
      const result = selectSelectedId.projector(state);
      expect(result).toBe('440');
    });
  });

  describe('selectEntity', () => {
    it('should return selected entity when selectedId exists', () => {
      const entities = { '440': mockBrands[0] };
      const result = selectEntity.projector(entities, '440');
      expect(result).toEqual(mockBrands[0]);
    });

    it('should return undefined when selectedId does not exist', () => {
      const entities = { '440': mockBrands[0] };
      const result = selectEntity.projector(entities, '999');
      expect(result).toBeUndefined();
    });
  });

  describe('selectBrandSelected', () => {
    it('should return brandSelected', () => {
      const result = selectBrandSelected.projector(state);
      expect(result).toEqual(mockBrandSelected);
    });
  });
});
