import { SubjectState } from './../store';
import { createReducer, on } from '@ngrx/store';

import * as actions from './subjects.actions';

export const initialState: SubjectState = {
  error: undefined,
  current: 'success',
  subjects: [],
};

export const subjectsReducer = createReducer(
  initialState,
  on(
    actions.getSubjects,
    actions.addSubject,
    actions.updateSubject,
    actions.deleteSubject,
    (state) => {
      return {
        ...state,
        error: undefined,
        current: 'loading',
      };
    }
  ),

  on(actions.getSubjectsSuccess, (state, { subjects }) => {
    return {
      ...state,
      current: 'success',
      subjects: subjects,
    };
  }),

  on(actions.deleteSubjectSuccess, (state, { id }) => {
    return {
      ...state,
      current: 'success',
      subjects: state.subjects.filter((s) => s.id !== id),
    };
  }),

  on(actions.updateSubjectSuccess, (state, { subject }) => {
    let updated = state.subjects.slice();
    const index = updated.findIndex((s) => s.id === subject.id);
    updated[index] = subject;

    return {
      ...state,
      current: 'success',
      subjects: updated,
    };
  }),

  on(actions.addSubjectSuccess, (state, { subject }) => {
    return {
      ...state,
      current: 'success',
      subjects: [...state.subjects, subject],
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
