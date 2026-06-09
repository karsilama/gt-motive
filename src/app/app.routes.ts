import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@brands/feature').then((m) => m.BrandsFeatureModule),
    pathMatch: 'full',
  },
];
