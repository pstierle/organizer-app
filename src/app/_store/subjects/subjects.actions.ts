import { ISubject } from './../../_models/ISubject';
import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const getSubjects = createAction('[Subjects] Get Subjects');

export const getSubjectsSuccess = createAction(
  '[Subjects] Get SubjectsSuccess',
  props<{ subjects: ISubject[] }>()
);

export const addSubject = createAction(
  '[Subjects] Add Subject',
  props<{ subject: Partial<ISubject> }>()
);

export const addSubjectSuccess = createAction(
  '[Subjects] Add Subjects Success',
  props<{ subject: ISubject }>()
);

export const updateSubject = createAction(
  '[Subjects] Update Subject',
  props<{ subjectId: string; data: Partial<ISubject> }>()
);

export const updateSubjectSuccess = createAction(
  '[Subjects] Update Subjects Success',
  props<{ subject: ISubject }>()
);

export const deleteSubject = createAction(
  '[Subjects] Delete Subject',
  props<{ id: string }>()
);

export const deleteSubjectSuccess = createAction(
  '[Subjects] Delete Subjects Success',
  props<{ id: string }>()
);

export const handleError = createAction(
  '[Error] Error',
  props<{ error: HttpErrorResponse }>()
);
