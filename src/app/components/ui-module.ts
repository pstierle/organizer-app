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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
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
  ],
  providers: [AddSubjectComponent],
})
export class UiModule {}
