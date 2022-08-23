import { SubmissionEffects } from './_store/submissions/submissions.effects';
import { RouterModule } from '@angular/router';
import { ModalService } from './_services/modal.service';
import { SubjectEffects } from './_store/subjects/subjects.effects';
import { subjectsReducer } from './_store/subjects/subjects.reducer';
import { CourseEffects } from './_store/courses/courses.effects';
import { coursesReducer } from './_store/courses/courses.reducer';
import { courseAreaReducer } from './_store/course-areas/course-areas.reducer';
import { CourseAreasEffects } from './_store/course-areas/course-areas.effects';
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
import { OverlayModule } from '@angular/cdk/overlay';
import { submissionReducer } from './_store/submissions/submissions.reducer';

function initializeUser(authService: AuthService): () => any {
  return () => authService.init();
}

@NgModule({
  declarations: [AppComponent, NotificationsComponent, NavbarComponent],
  imports: [
    OverlayModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    UiModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    EffectsModule.forRoot([
      UniversitiesEffects,
      CourseAreasEffects,
      CourseEffects,
      SubjectEffects,
      SubmissionEffects,
    ]),
    StoreModule.forRoot({
      universityState: universitiesReducer,
      courseAreaState: courseAreaReducer,
      courseState: coursesReducer,
      subjectState: subjectsReducer,
      submissionState: submissionReducer,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUser,
      deps: [AuthService],
      multi: true,
    },
    ModalService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
