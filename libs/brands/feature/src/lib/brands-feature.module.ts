import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandsDomainModule } from '@brands/domain';
import { BrandsRoutes } from '../lib/brands.routes';

@NgModule({
  imports: [RouterModule.forChild(BrandsRoutes), BrandsDomainModule],
})
export class BrandsFeatureModule {}
