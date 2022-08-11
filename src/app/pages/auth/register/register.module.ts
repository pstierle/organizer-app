import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UiModule } from 'src/app/components/ui-module';

@NgModule({
  declarations: [RegisterPage],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    RegisterRoutingModule,
    CommonModule,
  ],
  providers: [],
})
export class RegisterModule {}
