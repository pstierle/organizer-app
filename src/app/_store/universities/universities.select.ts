import { AppState } from '../store';

export const selectUniversities = (state: any) =>
  (state as AppState).universityState.universities;

export const selectError = (state: any) =>
  (state as AppState).universityState.error;

export const selectUniversitiesAsOptions = (state: any) =>
  (state as AppState).universityState.universities.map((universitiy) => {
    return {
      label: universitiy.name,
      value: universitiy.id,
    };
  });
