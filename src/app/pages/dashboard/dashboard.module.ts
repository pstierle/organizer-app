import { CommonModule } from '@angular/common';
import { UiModule } from 'src/app/components/ui-module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { DashboardPage } from './dashboard.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [DashboardPage],
  imports: [DashboardRoutingModule, UiModule, FontAwesomeModule, CommonModule],
  providers: [],
})
export class DashboardModule {}
