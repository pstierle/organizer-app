import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IExerciseSheet } from 'src/app/_models/IExerciseSheet';

export const getExcerciseSheets = createAction(
  '[ExcerciseSheets] Get ExcerciseSheets',
  props<{ subjectId: string }>()
);

export const getExcerciseSheetsSuccess = createAction(
  '[ExcerciseSheets] Get ExcerciseSheetsSuccess',
  props<{ excerciseSheets: IExerciseSheet[] }>()
);

export const addExcerciseSheet = createAction(
  '[ExcerciseSheets] Add ExcerciseSheet',
  props<{ excerciseSheet: Partial<IExerciseSheet> }>()
);

export const addExcerciseSheetSuccess = createAction(
  '[ExcerciseSheets] Add ExcerciseSheets Success',
  props<{ excerciseSheet: IExerciseSheet }>()
);

export const updateExcerciseSheet = createAction(
  '[ExcerciseSheets] Update ExcerciseSheet',
  props<{ excerciseSheetId: string; data: Partial<IExerciseSheet> }>()
);

export const updateExcerciseSheetSuccess = createAction(
  '[ExcerciseSheets] Update ExcerciseSheets Success',
  props<{ excerciseSheet: IExerciseSheet }>()
);

export const deleteExcerciseSheet = createAction(
  '[ExcerciseSheets] Delete ExcerciseSheet',
  props<{ id: string }>()
);

export const deleteExcerciseSheetSuccess = createAction(
  '[ExcerciseSheets] Delete ExcerciseSheets Success',
  props<{ id: string }>()
);

export const handleError = createAction(
  '[Error] Error',
  props<{ error: HttpErrorResponse }>()
);
