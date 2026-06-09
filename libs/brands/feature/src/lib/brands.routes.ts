import { Route } from '@angular/router';
import { BrandList } from './brand-list/brand-list';

export const BrandsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => BrandList,
  },
];
