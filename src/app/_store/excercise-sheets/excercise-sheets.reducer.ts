import { ExcerciseSheetState } from './../store';
import { createReducer, on } from '@ngrx/store';

import * as actions from './excercise-sheets.actions';

export const initialState: ExcerciseSheetState = {
  error: undefined,
  current: 'success',
  excerciseSheets: [],
};

export const excerciseSheetReducer = createReducer(
  initialState,
  on(
    actions.getExcerciseSheets,
    actions.addExcerciseSheet,
    actions.updateExcerciseSheet,
    actions.deleteExcerciseSheet,
    (state): ExcerciseSheetState => {
      return {
        ...state,
        error: undefined,
        current: 'loading',
      };
    }
  ),

  on(
    actions.getExcerciseSheetsSuccess,
    (state, { excerciseSheets }): ExcerciseSheetState => {
      return {
        ...state,
        current: 'success',
        excerciseSheets: excerciseSheets,
      };
    }
  ),

  on(
    actions.deleteExcerciseSheetSuccess,
    (state, { id }): ExcerciseSheetState => {
      return {
        ...state,
        current: 'success',
        excerciseSheets: state.excerciseSheets.filter((s) => s.id !== id),
      };
    }
  ),

  on(
    actions.updateExcerciseSheetSuccess,
    (state, { excerciseSheet }): ExcerciseSheetState => {
      let updated = state.excerciseSheets.slice();
      const index = updated.findIndex((s) => s.id === excerciseSheet.id);
      updated[index] = excerciseSheet;

      return {
        ...state,
        current: 'success',
        excerciseSheets: updated,
      };
    }
  ),

  on(
    actions.addExcerciseSheetSuccess,
    (state, { excerciseSheet }): ExcerciseSheetState => {
      return {
        ...state,
        current: 'success',
        excerciseSheets: [...state.excerciseSheets, excerciseSheet],
      };
    }
  ),

  on(actions.handleError, (state, { error }): ExcerciseSheetState => {
    return {
      ...state,
      current: 'error',
      error: error,
    };
  })
);
