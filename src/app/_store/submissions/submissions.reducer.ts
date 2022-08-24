import { SubmissionState } from './../store';
import { createReducer, on } from '@ngrx/store';

import * as actions from './submissions.actions';

export const initialState: SubmissionState = {
  error: undefined,
  current: 'success',
  submissions: [],
};

export const submissionReducer = createReducer(
  initialState,
  on(
    actions.getSubmissions,
    actions.addSubmission,
    actions.deleteSubmission,
    (state): SubmissionState => {
      return {
        ...state,
        error: undefined,
        current: 'loading',
      };
    }
  ),

  on(
    actions.getSubmissionsSuccess,
    (state, { submissions }): SubmissionState => {
      return {
        ...state,
        current: 'success',
        submissions: submissions,
      };
    }
  ),

  on(actions.deleteSubmissionSuccess, (state, { id }): SubmissionState => {
    return {
      ...state,
      current: 'success',
      submissions: state.submissions.filter((s) => s.id !== id),
    };
  }),

  on(actions.addSubmissionSuccess, (state, { submission }): SubmissionState => {
    console.log(submission);
    return {
      ...state,
      current: 'success',
      submissions: [...state.submissions, submission],
    };
  }),

  on(actions.handleError, (state, { error }): SubmissionState => {
    return {
      ...state,
      current: 'error',
      error: error,
    };
  })
);
