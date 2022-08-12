import { universitiesReducer } from './_store/universities/universities.reducer';
import { UiModule } from './components/ui-module';
import { AuthService } from './_services/auth.service';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { UniversitiesEffects } from './_store/universities/universities.effects';

function initializeUser(authService: AuthService): () => any {
  return () => authService.init();
}

@NgModule({
  declarations: [AppComponent, NotificationsComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    UiModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    EffectsModule.forRoot([UniversitiesEffects]),
    StoreModule.forRoot({
      universitiesState: universitiesReducer,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUser,
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
