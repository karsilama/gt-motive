import { Route } from '@angular/router';
import { BrandEdit } from './brand-edit/brand-edit';
import { BrandList } from './brand-list/brand-list';

export const BrandsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => BrandList,
  },
  {
    path: ':id',
    loadComponent: () => BrandEdit,
  },
];
