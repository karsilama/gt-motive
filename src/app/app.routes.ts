import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'brands',
    loadChildren: () =>
      import('@brands/feature').then((m) => m.BrandsFeatureModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'brands',
  },
];
