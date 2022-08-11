import { IUser } from './../_models/IUser';
import { HttpErrorResponse } from '@angular/common/http';

export type UserState = {
  user?: IUser;
  current: 'loading' | 'success' | 'error';
  error?: HttpErrorResponse;
};

export type AppState = {
  userState: UserState;
};
