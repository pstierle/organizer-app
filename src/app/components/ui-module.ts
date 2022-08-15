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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
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
  ],
})
export class UiModule {}
