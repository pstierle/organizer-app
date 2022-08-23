import { ISubmission } from './../../_models/ISubmission';
import { SubmissionService } from './../../_services/submission.service';
import * as actions from './submissions.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, delay, tap } from 'rxjs';
import { handleError } from './submissions.actions';

@Injectable()
export class SubmissionEffects {
  get$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getSubmissions),
      delay(500),
      switchMap(() =>
        this.submissionService
          .fetchUserSubmissions()
          .pipe(
            map((submissions: ISubmission[]) =>
              actions.getSubmissionsSuccess({ submissions })
            )
          )
      ),
      catchError((error) => of(handleError({ error })))
    );
  });

  add$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.addSubmission),
      delay(500),
      switchMap((action) =>
        this.submissionService.addSubmission(action.submission).pipe(
          tap((submission) => {
            this.submissionService.uploadFile(submission, action.file);
          }),
          map((submission: ISubmission) =>
            actions.addSubmissionSuccess({ submission })
          )
        )
      ),
      catchError((error) => of(handleError({ error })))
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.deleteSubmission),
      delay(500),
      switchMap((action) =>
        this.submissionService.deleteSubmission(action.id).pipe(
          tap((submission) => {
            this.submissionService.deleteFile(submission);
          }),
          map((submission: ISubmission) =>
            actions.deleteSubmissionSuccess({ id: submission.id })
          )
        )
      ),
      catchError((error) => of(handleError({ error })))
    );
  });

  constructor(
    private actions$: Actions,
    private submissionService: SubmissionService
  ) {}
}
