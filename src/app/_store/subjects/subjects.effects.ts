import { AuthService } from './../../_services/auth.service';
import {
  getSubjects,
  getSubjectsSuccess,
  addSubject,
  addSubjectSuccess,
  handleError,
} from './subjects.actions';
import { ISubject } from './../../_models/ISubject';
import { SubjectService } from './../../_services/subjects.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';

@Injectable()
export class SubjectEffects {
  get$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSubjects),
      switchMap(() =>
        this.subjectsService
          .fetchUserSubjects()
          .pipe(map((subjects: ISubject[]) => getSubjectsSuccess({ subjects })))
      ),
      catchError((error) => of(handleError({ error })))
    );
  });

  add$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addSubject),
      switchMap((action) =>
        this.subjectsService
          .addSubject({
            name: action.subject.name,
            semester: action.subject.semester,
            user_id: this.authService.authUser?.id,
          })
          .pipe(map((subject: ISubject) => addSubjectSuccess({ subject })))
      ),
      catchError((error) => of(handleError({ error })))
    );
  });

  constructor(
    private actions$: Actions,
    private subjectsService: SubjectService,
    private authService: AuthService
  ) {}
}
