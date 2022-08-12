import { AppState } from '../store';

export const selectUniversities = (state: any) =>
  (state as AppState).universitiesState.universities;

export const selectError = (state: any) =>
  (state as AppState).universitiesState.error;
