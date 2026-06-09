import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as BrandsActions from './brands.actions';
import { BrandsEffects } from './brands.effects';

describe('BrandsEffects', () => {
  let actions: Observable<Action>;
  let effects: BrandsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        BrandsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(BrandsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: BrandsActions.initBrands() });

      const expected = hot('-a-|', {
        a: BrandsActions.loadBrandsSuccess({ brands: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
