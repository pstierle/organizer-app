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

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  declarations: [
    ButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    DashboardNavItemComponent,
    UpdateUserComponent,
    ContainerComponent,
  ],
  exports: [
    ButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    DashboardNavItemComponent,
    UpdateUserComponent,
    ContainerComponent,
  ],
})
export class UiModule {}
