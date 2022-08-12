import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { UiModule } from 'src/app/components/ui-module';

@NgModule({
  declarations: [HomePage],
  imports: [FormsModule, ReactiveFormsModule, UiModule, HomeRoutingModule],
  providers: [],
})
export class HomeModule {}
