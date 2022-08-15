import { ICourseArea } from './../../_models/ICourseArea';
import { CourseAreaService } from './../../_services/course-areas.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import {
  handleError,
  getCourseAreas,
  getCourseAreasSuccess,
} from './course-areas.actions';

@Injectable()
export class CourseAreasEffects {
  getEms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCourseAreas),
      switchMap((action) =>
        this.courseAreaService
          .fetchAll()
          .pipe(
            map((courseAreas: ICourseArea[]) =>
              getCourseAreasSuccess({ courseAreas })
            )
          )
      ),
      catchError((error) => of(handleError({ error })))
    );
  });

  constructor(
    private actions$: Actions,
    private courseAreaService: CourseAreaService
  ) {}
}
