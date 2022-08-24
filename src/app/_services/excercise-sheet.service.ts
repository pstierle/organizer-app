import { IExerciseSheet } from './../_models/IExerciseSheet';
import { Injectable } from '@angular/core';
import { BaseService } from './supabase.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExcerciseSheetService extends BaseService<IExerciseSheet> {
  constructor(private authService: AuthService) {
    super('excercise_sheets');
  }

  addExcerciseSheet(excerciseSheet: Partial<IExerciseSheet>) {
    return this.create(this.authService.injectUserId(excerciseSheet));
  }

  fetchExcerciseSheetsBySubject(subjectId: string) {
    return this.find('id, number, user_id, subject_id, topic', [
      ['user_id', 'eq', this.authService.authUser?.id],
      ['subject_id', 'eq', subjectId],
    ]);
  }

  updateExcerciseSheet(id: string, data: Partial<IExerciseSheet>) {
    return this.update(id, data);
  }

  deleteExcerciseSheet(id: string) {
    return this.delete(id);
  }
}
