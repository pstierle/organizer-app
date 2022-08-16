import { IExerciseSheet } from './../../_models/IExerciseSheet';
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
  props<{ subject: ISubject }>()
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

export const addExcerciseSheet = createAction(
  '[Subjects] Add ExcerciseSheet',
  props<{ excerciseSheet: Partial<IExerciseSheet> }>()
);

export const addExcerciseSheetSuccess = createAction(
  '[Subjects] Add ExcerciseSheets Success',
  props<{ excerciseSheet: IExerciseSheet }>()
);

export const updateExcerciseSheet = createAction(
  '[Subjects] Update ExcerciseSheet',
  props<{ excerciseSheet: IExerciseSheet }>()
);

export const updateExcerciseSheetSuccess = createAction(
  '[Subjects] Update ExcerciseSheets Success',
  props<{ excerciseSheet: IExerciseSheet }>()
);

export const deleteExcerciseSheet = createAction(
  '[Subjects] Delete ExcerciseSheet',
  props<{ id: string }>()
);

export const deleteExcerciseSheetSuccess = createAction(
  '[Subjects] Delete ExcerciseSheets Success',
  props<{ subjectId: string; id: string }>()
);

export const handleError = createAction(
  '[Error] Error',
  props<{ error: HttpErrorResponse }>()
);
