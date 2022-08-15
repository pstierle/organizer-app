import { CourseAreaService } from './../../_services/course-areas.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { handleError, getCourses, getCoursesSuccess } from './courses.actions';
import { ICourse } from 'src/app/_models/ICourse';
import { CourseService } from 'src/app/_services/courses.service';

@Injectable()
export class CourseEffects {
  getEms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCourses),
      switchMap((action) =>
        this.coursesService
          .fetchAll()
          .pipe(map((courses: ICourse[]) => getCoursesSuccess({ courses })))
      ),
      catchError((error) => of(handleError({ error })))
    );
  });

  constructor(
    private actions$: Actions,
    private coursesService: CourseService
  ) {}
}
