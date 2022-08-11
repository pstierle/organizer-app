import { UserState } from './../store';
import { createReducer, on } from '@ngrx/store';

import * as actions from './user.actions';

export const initialState: UserState = {
  error: undefined,
  current: 'success',
  user: undefined,
};

export const employeesReducer = createReducer(
  initialState,
  on(
    actions.getUser,
    (state) => {
      return {
        ...state,
        error: undefined,
        current: 'loading',
      };
    }
  ),

  // GET
  on(actions.getUserSuccess, (state, { user }) => {
    return {
      ...state,
      current: 'success',
      user: user,
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
