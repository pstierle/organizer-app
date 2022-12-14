import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { SubjectDetailRoutingModule } from './subject-detail-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UiModule } from 'src/app/components/ui-module';
import { SubjectDetailPage } from './subject-detail.page';

@NgModule({
  declarations: [SubjectDetailPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    SubjectDetailRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
})
export class SubjectDetailModule {}
