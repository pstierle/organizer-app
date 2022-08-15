import { AppState } from '../store';

export const selectError = (state: any) =>
  (state as AppState).courseAreaState.error;

export const selectCourseAreas = (state: any) =>
  (state as AppState).courseAreaState.courseAreas;

