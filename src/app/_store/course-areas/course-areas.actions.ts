import { ICourseArea } from './../../_models/ICourseArea';
import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const getCourseAreas = createAction('[Course Area] Get Course Area');

export const getCourseAreasSuccess = createAction(
  '[Course Area] Get Course Area Success',
  props<{ courseAreas: ICourseArea[] }>()
);

export const handleError = createAction(
  '[Error] Error',
  props<{ error: HttpErrorResponse }>()
);
