import { IUniversity } from '../../_models/IUniversity';
import { UniversitiesService } from '../../_services/universities.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import {
  handleError,
  getUniversities,
  getUniversitiesSuccess,
} from './universities.actions';

@Injectable()
export class UniversitiesEffects {
  getEms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUniversities),
      switchMap((action) =>
        this.universitiesService
          .fetchAll()
          .pipe(
            map((universities: IUniversity[]) =>
              getUniversitiesSuccess({ universities })
            )
          )
      ),
      catchError((error) => of(handleError({ error })))
    );
  });

  constructor(
    private actions$: Actions,
    private universitiesService: UniversitiesService
  ) {}
}
