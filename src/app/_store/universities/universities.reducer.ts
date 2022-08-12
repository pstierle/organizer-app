import { createReducer, on } from '@ngrx/store';
import { UniversitiesState } from '../store';

import * as actions from './universities.actions';

export const initialState: UniversitiesState = {
  error: undefined,
  current: 'success',
  universities: [],
};

export const universitiesReducer = createReducer(
  initialState,
  on(actions.getUniversities, (state) => {
    return {
      ...state,
      error: undefined,
      current: 'loading',
    };
  }),

  // GET
  on(actions.getUniversitiesSuccess, (state, { universities }) => {
    return {
      ...state,
      current: 'success',
      universities: universities,
    };
  }),

  // ERROR
  on(actions.handleError, (state, { error }) => {
    return {
      ...state,
      current: 'error',
      error: error,
    };
  })
);
