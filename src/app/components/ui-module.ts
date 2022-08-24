import { FadeTransitionComponent } from './transitions/fade-transition/fade-transition.component';
import { FileViewerComponent } from './modal/file-viewer/file-viewer.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ClickOutsideDirective } from './../_directives/click-outside.directive';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ExcerciseSheetComponent } from './excercise-sheet/excercise-sheet.component';
import { DeleteSubjectComponent } from './modal/delete-subject/delete-subject.component';
import { InputComponent } from './input/input.component';
import { ExpansionCardComponent } from './expansion-card/expansion-card.component';
import { SpinnerIconComponent } from './icons/spinner-icon/spinner-icon.component';
import { RouterModule } from '@angular/router';
import { AddSubjectComponent } from './modal/add-subject/add-subject.component';
import { SubjectsOverviewComponent } from './subjects-overview/subjects-overview.component';
import { FileInputComponent } from './file-input/file-input.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { ContainerComponent } from './container/container.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DashboardNavItemComponent } from './dashboard-nav-item/dashboard-nav-item.component';
import { FormInputComponent } from './form-input/form-input.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileImageComponent } from './update-profile-image/update-profile-image.component';
import { AddExcerciseSheetComponent } from './add-excercise-sheet/add-excercise-sheet.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    DashboardNavItemComponent,
    UpdateUserComponent,
    ContainerComponent,
    UpdateProfileImageComponent,
    ProfileImageComponent,
    FileInputComponent,
    SubjectsOverviewComponent,
    AddSubjectComponent,
    SpinnerIconComponent,
    ExpansionCardComponent,
    InputComponent,
    DeleteSubjectComponent,
    ExcerciseSheetComponent,
    SearchbarComponent,
    ClickOutsideDirective,
    AddExcerciseSheetComponent,
    DropdownComponent,
    FileViewerComponent,
    FadeTransitionComponent,
  ],
  exports: [
    ButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    DashboardNavItemComponent,
    UpdateUserComponent,
    ContainerComponent,
    UpdateProfileImageComponent,
    ProfileImageComponent,
    FileInputComponent,
    SubjectsOverviewComponent,
    AddSubjectComponent,
    SpinnerIconComponent,
    ExpansionCardComponent,
    InputComponent,
    DeleteSubjectComponent,
    ExcerciseSheetComponent,
    SearchbarComponent,
    ClickOutsideDirective,
    AddExcerciseSheetComponent,
    DropdownComponent,
    FileViewerComponent,
    FadeTransitionComponent,
  ],
  providers: [AddSubjectComponent],
})
export class UiModule {}
