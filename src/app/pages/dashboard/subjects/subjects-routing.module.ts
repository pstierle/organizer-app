import { SubjectsPage } from './subjects.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SubjectsPage,
    children: [
      {
        path: 'detail/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./detail/subject-detail.module').then(
                (m) => m.SubjectDetailModule
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
export class SubjectsRoutingModule {}
