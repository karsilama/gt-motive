import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { BrandsEffects } from './+state/brands.effects';
import { BrandsFacade } from './+state/brands.facade';
import * as fromBrands from './+state/brands.reducer';
import { BrandErrorInterceptor } from './brands-error-interceptor';

@NgModule({
  providers: [
    BrandsFacade,
    provideState(fromBrands.BRANDS_FEATURE_KEY, fromBrands.brandsReducer),
    provideEffects(BrandsEffects),

    provideHttpClient(withInterceptors([BrandErrorInterceptor])),
  ],
})
export class BrandsDomainModule {}
