import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsPage } from './settings.page';
import { NgModule } from '@angular/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { UiModule } from 'src/app/components/ui-module';

@NgModule({
  declarations: [SettingsPage],
  imports: [FormsModule, ReactiveFormsModule, UiModule, SettingsRoutingModule],
  providers: [],
})
export class SettingsModule {}
