import { AppState } from '../store';

export const selectError = (state: any) =>
  (state as AppState).subjectState.error;

export const selectCurrent = (state: any) =>
  (state as AppState).subjectState.current;

export const isLoading = (state: any) =>
  (state as AppState).subjectState.current === 'loading';

export const selectSubjects = (state: any) =>
  (state as AppState).subjectState.subjects;
