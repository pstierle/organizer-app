import { SubjectDetailRoutingModule } from './subject-detail-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UiModule } from 'src/app/components/ui-module';
import { SubjectDetailPage } from './subject-detail.page';

@NgModule({
  declarations: [SubjectDetailPage],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    SubjectDetailRoutingModule,
  ],
  providers: [],
})
export class SubjectDetailModule {}
