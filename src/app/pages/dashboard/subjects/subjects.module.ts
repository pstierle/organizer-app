import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsPage } from './subjects.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UiModule } from 'src/app/components/ui-module';

@NgModule({
  declarations: [SubjectsPage],
  imports: [FormsModule, ReactiveFormsModule, UiModule, SubjectsRoutingModule],
  providers: [],
})
export class SubjectsModule {}
