import { ISubject } from './../../_models/ISubject';
import { AppState } from '../store';

export interface IGroupedBySemester {
  semester: number;
  subjects: ISubject[];
}

export const selectError = (state: any) =>
  (state as AppState).subjectState.error;

export const selectCurrent = (state: any) =>
  (state as AppState).subjectState.current;

export const isLoading = (state: any) =>
  (state as AppState).subjectState.current === 'loading';

export const selectSubjects = (state: any) =>
  (state as AppState).subjectState.subjects;

export const selectGroupedBySemester = (state: any) => {
  let groups: IGroupedBySemester[] = [];
  (state as AppState).subjectState.subjects.forEach((subject) => {
    const found = groups.find((g) => g.semester === subject.semester);
    if (found) {
      found.subjects.push(subject);
    } else {
      groups.push({
        semester: subject.semester,
        subjects: [subject],
      });
    }
  });

  return groups;
};
