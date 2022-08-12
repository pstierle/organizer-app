import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IUniversity } from 'src/app/_models/IUniversity';

export const getUniversities = createAction('[University] Get University');

export const getUniversitiesSuccess = createAction(
  '[University] Get University Success',
  props<{ universities: IUniversity[] }>()
);

export const handleError = createAction(
  '[Error] Error',
  props<{ error: HttpErrorResponse }>()
);
