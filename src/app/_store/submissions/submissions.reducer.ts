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
    (state) => {
      return {
        ...state,
        error: undefined,
        current: 'loading',
      };
    }
  ),

  on(actions.getSubmissionsSuccess, (state, { submissions }) => {
    return {
      ...state,
      current: 'success',
      submissions: submissions,
    };
  }),

  on(actions.deleteSubmissionSuccess, (state, { id }) => {
    return {
      ...state,
      current: 'success',
      subjects: state.submissions.filter((s) => s.id !== id),
    };
  }),

  on(actions.addSubmissionSuccess, (state, { submission }) => {
    return {
      ...state,
      current: 'success',
      subjects: [...state.submissions, submission],
    };
  }),

  on(actions.handleError, (state, { error }) => {
    return {
      ...state,
      current: 'error',
      error: error,
    };
  })
);
