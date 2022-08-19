import { AuthService } from './../../_services/auth.service';
import {
  getSubjects,
  getSubjectsSuccess,
  addSubject,
  addSubjectSuccess,
  updateSubject,
  updateSubjectSuccess,
  handleError,
  deleteSubject,
  deleteSubjectSuccess,
} from './subjects.actions';
import { ISubject } from './../../_models/ISubject';
import { SubjectService } from './../../_services/subjects.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, delay } from 'rxjs';

@Injectable()
export class SubjectEffects {
  get$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSubjects),
      delay(500),
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
      delay(500),
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

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateSubject),
      delay(500),
      switchMap((action) =>
        this.subjectsService
          .update(action.subjectId, action.data)
          .pipe(map((subject: ISubject) => updateSubjectSuccess({ subject })))
      ),
      catchError((error) => of(handleError({ error })))
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteSubject),
      delay(500),
      switchMap((action) =>
        this.subjectsService
          .deleteSubject(action.id)
          .pipe(
            map((subject: ISubject) => deleteSubjectSuccess({ id: subject.id }))
          )
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
