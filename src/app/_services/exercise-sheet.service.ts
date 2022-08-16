import { AuthService } from './auth.service';
import { IExerciseSheet } from './../_models/IExerciseSheet';
import { Injectable } from '@angular/core';
import { BaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ExcerciseSheetService extends BaseService<IExerciseSheet> {
  constructor(private authService: AuthService) {
    super('excercise_sheets');
  }

  addExcerciseSheet(sheet: Partial<IExerciseSheet>) {
    return this.create({
      ...sheet,
    });
  }

  updateExcerciseSheet(id: string, data: IExerciseSheet) {
    return this.update(id, data);
  }

  deleteExcerciseSheet(id: string) {
    return this.delete(id);
  }
}
