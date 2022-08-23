import { ISubmission } from './../../_models/ISubmission';
import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const getSubmissions = createAction('[Submissions] Get Submissions');

export const getSubmissionsSuccess = createAction(
  '[Submissions] Get SubmissionsSuccess',
  props<{ submissions: ISubmission[] }>()
);

export const addSubmission = createAction(
  '[Submissions] Add Submission',
  props<{ submission: Partial<ISubmission>; file: File }>()
);

export const addSubmissionSuccess = createAction(
  '[Submissions] Add Submissions Success',
  props<{ submission: ISubmission }>()
);

export const deleteSubmission = createAction(
  '[Submissions] Delete Submission',
  props<{ id: string }>()
);

export const deleteSubmissionSuccess = createAction(
  '[Submissions] Delete Submissions Success',
  props<{ id: string }>()
);

export const handleError = createAction(
  '[Error] Error',
  props<{ error: HttpErrorResponse }>()
);
