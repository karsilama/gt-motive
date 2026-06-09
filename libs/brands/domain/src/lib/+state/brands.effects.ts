import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigurationService } from '@configuration/domain';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, debounceTime, map, of, switchMap } from 'rxjs';
import * as BrandsActions from './brands.actions';
import { BrandResponse } from './brands.models';

@Injectable()
export class BrandsEffects implements OnInitEffects {
  private configuration = inject(ConfigurationService);

  private actions$ = inject(Actions);
  private http = inject(HttpClient);

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
      catchError((error) => {
        return of(BrandsActions.loadBrandsFailure({ error }));
      }),
    ),
  );

  public ngrxOnInitEffects() {
    return BrandsActions.initBrands();
  }
}
