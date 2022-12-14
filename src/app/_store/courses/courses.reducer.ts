import { CourseState } from './../store';
import { createReducer, on } from '@ngrx/store';

import * as actions from './courses.actions';

export const initialState: CourseState = {
  error: undefined,
  current: 'success',
  courses: [],
};

export const coursesReducer = createReducer(
  initialState,
  on(actions.getCourses, (state): CourseState => {
    return {
      ...state,
      error: undefined,
      current: 'loading',
    };
  }),

  // GET
  on(actions.getCoursesSuccess, (state, { courses }): CourseState => {
    return {
      ...state,
      current: 'success',
      courses: courses,
    };
  }),

  // ERROR
  on(actions.handleError, (state, { error }): CourseState => {
    return {
      ...state,
      current: 'error',
      error: error,
    };
  })
);
