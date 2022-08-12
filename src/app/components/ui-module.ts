import { DashboardNavItemComponent } from './dashboard-nav-item/dashboard-nav-item.component';
import { FormInputComponent } from './form-input/form-input.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ButtonComponent,
    FormInputComponent,
    SelectComponent,
    DashboardNavItemComponent,
  ],
  exports: [
    ButtonComponent,
    FormInputComponent,
    SelectComponent,
    DashboardNavItemComponent,
  ],
})
export class UiModule {}
