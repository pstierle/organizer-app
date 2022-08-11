import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from 'src/app/_models/IUser';

export const getUser = createAction(
  '[User] Get User',
  props<{ user: Partial<IUser> }>()
);

export const getUserSuccess = createAction(
  '[User] Get User Success',
  props<{ user: IUser }>()
);

export const handleError = createAction(
  '[Error] Error',
  props<{ error: HttpErrorResponse }>()
);
