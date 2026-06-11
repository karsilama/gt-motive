import { TestBed } from '@angular/core/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as BrandsActions from './brands.actions';
import { BrandsFacade } from './brands.facade';
import { BrandEntity, BrandSelected } from './brands.models';
import * as BrandsSelectors from './brands.selectors';

describe('BrandsFacade', () => {
  let facade: BrandsFacade;
  let store: MockStore;
  let mockAllBrandsSelector: MemoizedSelector<object, BrandEntity[]>;
  let mockLoadedSelector: MemoizedSelector<object, boolean>;
  let mockBrandSelectedLoadedSelector: MemoizedSelector<object, boolean>;
  let mockBrandSelectedSelector: MemoizedSelector<object, BrandSelected | null>;

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
      providers: [BrandsFacade, provideMockStore()],
    });

    facade = TestBed.inject(BrandsFacade);
    store = TestBed.inject(Store) as MockStore;

    mockAllBrandsSelector = store.overrideSelector(
      BrandsSelectors.selectAllBrands,
      mockBrands,
    );
    mockLoadedSelector = store.overrideSelector(
      BrandsSelectors.selectBrandsLoaded,
      true,
    );
    mockBrandSelectedLoadedSelector = store.overrideSelector(
      BrandsSelectors.selectBrandSelectedLoaded,
      true,
    );
    mockBrandSelectedSelector = store.overrideSelector(
      BrandsSelectors.selectBrandSelected,
      mockBrandSelected,
    );

    store.refreshState();
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  describe('selectors', () => {
    it('should expose allBrands as signal', () => {
      expect(facade.allBrands()).toEqual(mockBrands);
    });

    it('should expose loaded as signal', () => {
      expect(facade.loaded()).toBe(true);
    });

    it('should expose brandSelectedLoaded as signal', () => {
      expect(facade.brandSelectedLoaded()).toBe(true);
    });

    it('should expose brandSelected as signal', () => {
      expect(facade.brandSelected()).toEqual(mockBrandSelected);
    });
  });

  describe('getBrandsById', () => {
    it('should dispatch getBrandById action with Make_ID', () => {
      const makeId = '440';
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      facade.getBrandsById(makeId);

      expect(dispatchSpy).toHaveBeenCalledWith(
        BrandsActions.getBrandById({ Make_ID: makeId }),
      );
    });
  });

  describe('reloadBrands', () => {
    it('should dispatch initBrands action', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      facade.reloadBrands();

      expect(dispatchSpy).toHaveBeenCalledWith(BrandsActions.initBrands());
    });
  });
});
