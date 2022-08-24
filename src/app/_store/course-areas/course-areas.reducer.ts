import { CourseAreasState } from './../store';
import { createReducer, on } from '@ngrx/store';

import * as actions from './course-areas.actions';

export const initialState: CourseAreasState = {
  error: undefined,
  current: 'success',
  courseAreas: [],
};

export const courseAreaReducer = createReducer(
  initialState,
  on(actions.getCourseAreas, (state): CourseAreasState => {
    return {
      ...state,
      error: undefined,
      current: 'loading',
    };
  }),

  // GET
  on(
    actions.getCourseAreasSuccess,
    (state, { courseAreas }): CourseAreasState => {
      return {
        ...state,
        current: 'success',
        courseAreas: courseAreas,
      };
    }
  ),

  // ERROR
  on(actions.handleError, (state, { error }): CourseAreasState => {
    return {
      ...state,
      current: 'error',
      error: error,
    };
  })
);
