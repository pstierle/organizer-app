import { AppState } from '../store';

export const selectUser = (state: any) =>
  (state as AppState).userState.user;

export const selectError = (state: any) =>
  (state as AppState).userState.error;
