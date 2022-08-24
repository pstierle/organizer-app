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
  on(actions.getUniversities, (state): UniversitiesState => {
    return {
      ...state,
      error: undefined,
      current: 'loading',
    };
  }),

  // GET
  on(
    actions.getUniversitiesSuccess,
    (state, { universities }): UniversitiesState => {
      return {
        ...state,
        current: 'success',
        universities: universities,
      };
    }
  ),

  // ERROR
  on(actions.handleError, (state, { error }): UniversitiesState => {
    return {
      ...state,
      current: 'error',
      error: error,
    };
  })
);
