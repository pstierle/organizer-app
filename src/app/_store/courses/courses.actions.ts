import { ICourse } from 'src/app/_models/ICourse';
import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const getCourses = createAction('[Course] Get Courses');

export const getCoursesSuccess = createAction(
  '[Courses] Get CoursesSuccess',
  props<{ courses: ICourse[] }>()
);

export const handleError = createAction(
  '[Error] Error',
  props<{ error: HttpErrorResponse }>()
);
