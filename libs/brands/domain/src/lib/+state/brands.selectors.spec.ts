import { BrandEntity } from './brands.models';
import {
  brandsAdapter,
  BrandsPartialState,
  initialBrandsState,
} from './brands.reducer';
import * as BrandsSelectors from './brands.selectors';

describe('Brands Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBrandsId = (it: BrandEntity) => it.id;
  const createBrandEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    }) as BrandEntity;

  let state: BrandsPartialState;

  beforeEach(() => {
    state = {
      brands: brandsAdapter.setAll(
        [
          createBrandEntity('PRODUCT-AAA'),
          createBrandEntity('PRODUCT-BBB'),
          createBrandEntity('PRODUCT-CCC'),
        ],
        {
          ...initialBrandsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        },
      ),
    };
  });

  describe('Brands Selectors', () => {
    it('selectAllBrands() should return the list of Brands', () => {
      const results = BrandsSelectors.selectAllBrands(state);
      const selId = getBrandsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = BrandsSelectors.selectEntity(state) as BrandEntity;
      const selId = getBrandsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectBrandsLoaded() should return the current "loaded" status', () => {
      const result = BrandsSelectors.selectBrandsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectBrandsError() should return the current "error" state', () => {
      const result = BrandsSelectors.selectBrandsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
