import { ISubject } from './../../_models/ISubject';
import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const getSubjects = createAction('[Course] Get Subjects');

export const addSubject = createAction(
  '[Course] Add Subject',
  props<{ subject: Partial<ISubject> }>()
);

export const addSubjectSuccess = createAction(
  '[Course] Add Subjects Success',
  props<{ subject: ISubject }>()
);

export const getSubjectsSuccess = createAction(
  '[Subjects] Get SubjectsSuccess',
  props<{ subjects: ISubject[] }>()
);

export const handleError = createAction(
  '[Error] Error',
  props<{ error: HttpErrorResponse }>()
);
