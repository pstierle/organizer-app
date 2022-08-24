import { IExerciseSheet } from './../../_models/IExerciseSheet';
import * as actions from './excercise-sheets.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, delay } from 'rxjs';
import { ExcerciseSheetService } from 'src/app/_services/excercise-sheet.service';

@Injectable()
export class ExcerciseSheetEffects {
  get$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getExcerciseSheets),
      delay(500),
      switchMap((action) =>
        this.excerciseSheetService
          .fetchExcerciseSheetsBySubject(action.subjectId)
          .pipe(
            map((excerciseSheets: IExerciseSheet[]) =>
              actions.getExcerciseSheetsSuccess({ excerciseSheets })
            )
          )
      ),
      catchError((error) => of(actions.handleError({ error })))
    );
  });

  add$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.addExcerciseSheet),
      delay(500),
      switchMap((action) =>
        this.excerciseSheetService
          .addExcerciseSheet(action.excerciseSheet)
          .pipe(
            map((excerciseSheet: IExerciseSheet) =>
              actions.addExcerciseSheetSuccess({ excerciseSheet })
            )
          )
      ),
      catchError((error) => of(actions.handleError({ error })))
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.updateExcerciseSheet),
      delay(500),
      switchMap((action) =>
        this.excerciseSheetService
          .update(action.excerciseSheetId, action.data)
          .pipe(
            map((excerciseSheet: IExerciseSheet) =>
              actions.updateExcerciseSheetSuccess({ excerciseSheet })
            )
          )
      ),
      catchError((error) => of(actions.handleError({ error })))
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.deleteExcerciseSheet),
      delay(500),
      switchMap((action) =>
        this.excerciseSheetService
          .deleteExcerciseSheet(action.id)
          .pipe(
            map((excerciseSheet: IExerciseSheet) =>
              actions.deleteExcerciseSheetSuccess({ id: excerciseSheet.id })
            )
          )
      ),
      catchError((error) => of(actions.handleError({ error })))
    );
  });

  constructor(
    private actions$: Actions,
    private excerciseSheetService: ExcerciseSheetService
  ) {}
}
