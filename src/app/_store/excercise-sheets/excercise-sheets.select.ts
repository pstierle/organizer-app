import { AppState } from '../store';

export const selectError = (state: any) =>
  (state as AppState).excerciseSheetState.error;

export const selectCurrent = (state: any) =>
  (state as AppState).excerciseSheetState.current;

export const selectExcerciseSheets = (state: any) =>
  (state as AppState).excerciseSheetState.excerciseSheets;
