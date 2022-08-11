import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { UiModule } from 'src/app/components/ui-module';

@NgModule({
  declarations: [LoginPage],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    LoginRoutingModule,
  ],
  providers: [],
})
export class LoginModule {}
