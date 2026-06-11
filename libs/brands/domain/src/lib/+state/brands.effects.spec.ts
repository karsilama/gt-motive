import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigurationService } from '@configuration/domain';
import { StorageService } from '@lab/storage';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import * as BrandsActions from './brands.actions';
import { BrandsEffects } from './brands.effects';
import {
  BrandResponse,
  ModelsResponse,
  VehicleTypesResponse,
} from './brands.models';

describe('BrandsEffects', () => {
  let actions$: Observable<Action>;
  let effects: BrandsEffects;
  let httpClientMock: jest.Mocked<HttpClient>;
  let configurationServiceMock: jest.Mocked<ConfigurationService>;
  let storageMock: {
    getItem: jest.Mock;
    setItem: jest.Mock;
    removeItem: jest.Mock;
  };

  const mockBaseUrl = 'https://vpic.nhtsa.dot.gov/api';

  beforeEach(() => {
    jest.useFakeTimers();

    httpClientMock = {
      get: jest.fn(),
    } as any;

    storageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };

    configurationServiceMock = {
      getBaseConfiguration: jest.fn(),
    } as any;
    configurationServiceMock.getBaseConfiguration.mockReturnValue({
      api: { url: mockBaseUrl },
    });

    TestBed.configureTestingModule({
      providers: [
        BrandsEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: HttpClient, useValue: httpClientMock },
        // provide a simple in-memory storage mock to avoid touching window.localStorage
        { provide: StorageService, useValue: storageMock },
        { provide: ConfigurationService, useValue: configurationServiceMock },
      ],
    });

    effects = TestBed.inject(BrandsEffects);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('init$', () => {
    it('should dispatch loadBrandsSuccess after debounce', () => {
      const apiResponse: BrandResponse = {
        Count: 2,
        Message: 'Success',
        SearchCriteria: '',
        Results: [
          { Make_ID: '440', Make_Name: 'ASTON MARTIN' },
          { Make_ID: '441', Make_Name: 'TESLA' },
        ],
      };
      httpClientMock.get.mockReturnValue(of(apiResponse));
      actions$ = of(BrandsActions.initBrands());

      let result: Action | undefined;
      effects.init$.subscribe((action) => (result = action));

      jest.advanceTimersByTime(800);

      const expectedBrands = apiResponse.Results.map((b) => ({
        Make_ID: String(b.Make_ID),
        Make_Name: b.Make_Name,
      }));
      expect(result).toEqual(
        BrandsActions.loadBrandsSuccess({ brands: expectedBrands }),
      );
    });

    it('should dispatch loadBrandsFailure on API error after debounce', () => {
      const error = new Error('Network error');
      httpClientMock.get.mockReturnValue(throwError(() => error));
      actions$ = of(BrandsActions.initBrands());

      let result: Action | undefined;
      effects.init$.subscribe((action) => (result = action));

      jest.advanceTimersByTime(800);
      expect(result).toEqual(
        BrandsActions.loadBrandsFailure({ error: error.message }),
      );
    });
  });

  describe('getBrandById$', () => {
    const makeIdNumber = 440;
    const makeIdString = String(makeIdNumber);

    const vehicleTypesApiResponse: VehicleTypesResponse = {
      Count: 1,
      Message: 'Success',
      SearchCriteria: '',
      Results: [{ VehicleTypeId: 2, VehicleTypeName: 'Passenger Car' }],
    };

    const modelsApiResponse: ModelsResponse = {
      Count: 1,
      Message: 'Success',
      SearchCriteria: '',
      Results: [
        {
          Make_ID: makeIdNumber,
          Make_Name: 'ASTON MARTIN',
          Model_ID: 101,
          Model_Name: 'DB9',
        },
      ],
    };

    const expectedVehicleTypes = vehicleTypesApiResponse.Results;
    const expectedModels = modelsApiResponse.Results.map((m) => ({
      ...m,
      Make_ID: m.Make_ID,
      Model_ID: m.Model_ID,
    }));

    beforeEach(() => {
      jest.clearAllMocks();
      storageMock.getItem.mockClear();
      storageMock.setItem.mockClear();
      storageMock.removeItem.mockClear();
    });

    it('should dispatch success with data from cache if present', () => {
      const cacheKey = `brand_${makeIdString}`;
      const cachedData = {
        vehicleTypes: expectedVehicleTypes,
        models: expectedModels,
      };
      storageMock.getItem.mockReturnValueOnce(cachedData);

      actions$ = of(BrandsActions.getBrandById({ Make_ID: makeIdString }));

      let result: Action | undefined;
      effects.getBrandById$.subscribe((action) => (result = action));

      expect(result).toEqual(
        BrandsActions.getBrandByIdSuccess({
          vehicleTypes: expectedVehicleTypes,
          models: expectedModels,
          Make_ID: makeIdString,
        }),
      );
      expect(httpClientMock.get).not.toHaveBeenCalled();
    });

    it('should call API and cache result when not in cache', () => {
      httpClientMock.get.mockImplementation((url: string) => {
        if (url.includes('GetVehicleTypesForMakeId')) {
          return of(vehicleTypesApiResponse);
        } else {
          return of(modelsApiResponse);
        }
      });

      actions$ = of(BrandsActions.getBrandById({ Make_ID: makeIdString }));

      let result: Action | undefined;
      effects.getBrandById$.subscribe((action) => (result = action));

      expect(result).toEqual(
        BrandsActions.getBrandByIdSuccess({
          vehicleTypes: expectedVehicleTypes,
          models: expectedModels,
          Make_ID: makeIdString,
        }),
      );

      const cacheKey = `brand_${makeIdString}`;
      expect(storageMock.setItem).toHaveBeenCalledWith(cacheKey, {
        vehicleTypes: expectedVehicleTypes,
        models: expectedModels,
      });
      expect(httpClientMock.get).toHaveBeenCalledTimes(2);
    });

    it('should dispatch failure on API error', () => {
      const error = new Error('API error');
      httpClientMock.get.mockReturnValue(throwError(() => error));

      actions$ = of(BrandsActions.getBrandById({ Make_ID: makeIdString }));

      let result: Action | undefined;
      effects.getBrandById$.subscribe((action) => (result = action));

      expect(result).toEqual(
        BrandsActions.getBrandByIdFailure({ error: error.message }),
      );
    });
  });
});
