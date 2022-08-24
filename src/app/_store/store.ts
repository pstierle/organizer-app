import { IFetchState } from './../_models/IFetchState';
import { ISubject } from './../_models/ISubject';
import { ICourseArea } from './../_models/ICourseArea';
import { IUniversity } from './../_models/IUniversity';
import { HttpErrorResponse } from '@angular/common/http';
import { ICourse } from '../_models/ICourse';
import { ISubmission } from '../_models/ISubmission';
import { IExerciseSheet } from '../_models/IExerciseSheet';

export type UniversitiesState = {
  universities: IUniversity[];
  current: IFetchState;
  error?: HttpErrorResponse;
};

export type CourseAreasState = {
  courseAreas: ICourseArea[];
  current: IFetchState;
  error?: HttpErrorResponse;
};

export type CourseState = {
  courses: ICourse[];
  current: IFetchState;
  error?: HttpErrorResponse;
};

export type SubjectState = {
  subjects: ISubject[];
  current: IFetchState;
  error?: HttpErrorResponse;
};

export type SubmissionState = {
  submissions: ISubmission[];
  current: IFetchState;
  error?: HttpErrorResponse;
};

export type ExcerciseSheetState = {
  excerciseSheets: IExerciseSheet[];
  current: IFetchState;
  error?: HttpErrorResponse;
};

export type AppState = {
  universityState: UniversitiesState;
  courseAreaState: CourseAreasState;
  courseState: CourseState;
  subjectState: SubjectState;
  submissionState: SubmissionState;
  excerciseSheetState: ExcerciseSheetState;
};
