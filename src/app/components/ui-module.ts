import { FormInputComponent } from './form-input/form-input.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ButtonComponent,
    FormInputComponent,
  ],
  exports: [
    ButtonComponent,
    FormInputComponent,
  ],
})
export class UiModule {}
