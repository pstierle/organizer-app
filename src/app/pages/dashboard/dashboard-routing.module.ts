import { DashboardPage } from './dashboard.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./home/home.module').then((m) => m.HomeModule),
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./settings/settings.module').then(
                (m) => m.SettingsModule
              ),
          },
        ],
      },
      {
        path: 'subjects',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./subjects/subjects.module').then(
                (m) => m.SubjectsModule
              ),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
