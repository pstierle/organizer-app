import { ISubject } from './../_models/ISubject';
import { ICourseArea } from './../_models/ICourseArea';
import { IUniversity } from './../_models/IUniversity';
import { HttpErrorResponse } from '@angular/common/http';
import { ICourse } from '../_models/ICourse';

export type UniversitiesState = {
  universities: IUniversity[];
  current: 'loading' | 'success' | 'error';
  error?: HttpErrorResponse;
};

export type CourseAreasState = {
  courseAreas: ICourseArea[];
  current: 'loading' | 'success' | 'error';
  error?: HttpErrorResponse;
};

export type CourseState = {
  courses: ICourse[];
  current: 'loading' | 'success' | 'error';
  error?: HttpErrorResponse;
};

export type SubjectState = {
  subjects: ISubject[];
  current: 'loading' | 'success' | 'error';
  error?: HttpErrorResponse;
};

export type AppState = {
  universityState: UniversitiesState;
  courseAreaState: CourseAreasState;
  courseState: CourseState;
  subjectState: SubjectState;
};
