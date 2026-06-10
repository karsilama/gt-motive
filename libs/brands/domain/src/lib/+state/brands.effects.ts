import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigurationService } from '@configuration/domain';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, debounceTime, forkJoin, map, of, switchMap } from 'rxjs';
import * as BrandsActions from './brands.actions';
import {
  BrandResponse,
  ModelsResponse,
  VehicleTypesResponse,
} from './brands.models';

@Injectable()
export class BrandsEffects implements OnInitEffects {
  private configuration = inject(ConfigurationService);

  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  public getBrandById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrandsActions.getBrandById),
      switchMap(({ Make_ID }) => {
        const cacheKey = `brand_${Make_ID}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          const { vehicleTypes, models } = JSON.parse(cached);
          return of(
            BrandsActions.getBrandByIdSuccess({
              vehicleTypes,
              models,
              Make_ID,
            }),
          );
        }

        const baseUrl = this.configuration.getBaseConfiguration().api.url;
        const vehicleTypesUrl = `${baseUrl}/vehicles/GetVehicleTypesForMakeId/${Make_ID}?format=json`;
        const modelsUrl = `${baseUrl}/vehicles/GetModelsForMakeId/${Make_ID}?format=json`;

        return forkJoin({
          vehicleTypes: this.http.get<VehicleTypesResponse>(vehicleTypesUrl),
          models: this.http.get<ModelsResponse>(modelsUrl),
        }).pipe(
          map(({ vehicleTypes, models }) => {
            localStorage.setItem(
              cacheKey,
              JSON.stringify({
                vehicleTypes: vehicleTypes.Results,
                models: models.Results,
              }),
            );
            return BrandsActions.getBrandByIdSuccess({
              vehicleTypes: vehicleTypes.Results,
              models: models.Results,
              Make_ID,
            });
          }),
          catchError((error) =>
            of(BrandsActions.getBrandByIdFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );

  public init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrandsActions.initBrands),
      debounceTime(800),
      switchMap(() =>
        this.http
          .get<BrandResponse>(
            `${this.configuration.getBaseConfiguration().api.url}/vehicles/GetAllMakes?format=json`,
          )
          .pipe(
            map((response) =>
              BrandsActions.loadBrandsSuccess({ brands: response.Results }),
            ),
            catchError((error) => {
              return of(
                BrandsActions.loadBrandsFailure({ error: error.message }),
              );
            }),
          ),
      ),
    ),
  );

  public ngrxOnInitEffects() {
    return BrandsActions.initBrands();
  }
}
