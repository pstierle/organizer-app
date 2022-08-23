import { SubmissionType } from './../../_models/ISubmission';
import { AppState } from '../store';

export const selectError = (state: any) =>
  (state as AppState).submissionState.error;

export const selectCurrent = (state: any) =>
  (state as AppState).submissionState.current;

export const isLoading = (state: any) =>
  (state as AppState).submissionState.current === 'loading';

export const selectSubmissions = (state: any, excerciseSheetId: string) =>
  (state as AppState).submissionState.submissions.filter(
    (s) => s.exercise_sheet_id === excerciseSheetId
  );

export const selectSubmissionsByType = (
  state: any,
  excerciseSheetId: string,
  type: SubmissionType
) =>
  (state as AppState).submissionState.submissions.filter(
    (s) => s.exercise_sheet_id === excerciseSheetId && s.type === type
  );
