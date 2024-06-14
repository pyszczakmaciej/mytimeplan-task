import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./views/diagram/diagram.routes').then((r) => r.diagramRoutes),
  },
];
