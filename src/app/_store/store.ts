import { IUniversity } from './../_models/IUniversity';
import { HttpErrorResponse } from '@angular/common/http';

export type UniversitiesState = {
  universities: IUniversity[];
  current: 'loading' | 'success' | 'error';
  error?: HttpErrorResponse;
};

export type AppState = {
  universitiesState: UniversitiesState;
};
