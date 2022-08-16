import { ISubject } from './../../_models/ISubject';
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
    actions.addExcerciseSheet,
    actions.updateExcerciseSheet,
    actions.deleteExcerciseSheet,
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

  on(actions.addExcerciseSheetSuccess, (state, { excerciseSheet }) => {
    let updated = state.subjects.slice();
    let subject = updated.find((s) => s.id === excerciseSheet.subject_id);
    const index = updated.findIndex((s) => s.id === excerciseSheet.subject_id);
    if (subject) {
      (subject as ISubject).excerciseSheets.push(excerciseSheet);
      updated[index] = subject;
    }
    return {
      ...state,
      current: 'success',
      subjects: updated,
    };
  }),

  on(actions.deleteExcerciseSheetSuccess, (state, { subjectId, id }) => {
    let updated = state.subjects.slice();
    let subject = updated.find((s) => s.id === subjectId);
    const index = updated.findIndex((s) => s.id === subjectId);
    if (subject) {
      (subject as ISubject).excerciseSheets = (
        subject as ISubject
      ).excerciseSheets.filter((sheet) => sheet.id !== id);
      updated[index] = subject;
    }
    return {
      ...state,
      current: 'success',
      subjects: updated,
    };
  }),

  on(actions.updateExcerciseSheetSuccess, (state, { excerciseSheet }) => {
    let updated = state.subjects.slice();
    let subject = updated.find((s) => s.id === excerciseSheet.subject_id);
    const index = updated.findIndex((s) => s.id === excerciseSheet.subject_id);
    if (subject) {
      const sheetIndex = (subject as ISubject).excerciseSheets.findIndex(
        (s) => s.id === excerciseSheet.id
      );
      (subject as ISubject).excerciseSheets[sheetIndex] = excerciseSheet;
      updated[index] = subject;
    }
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
