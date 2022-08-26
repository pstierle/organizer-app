import { IUser } from './../_models/IUser';
import { Observable } from 'rxjs';
import { IExerciseSheet } from './../_models/IExerciseSheet';
import { Injectable } from '@angular/core';
import { BaseService } from './supabase.service';
import { AuthService } from './auth.service';

export type ExcerciseSheetQuery = {
  topic: string;
  universityId: string;
  courseId: string;
};

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
    return this.find('id, number, user_id, subject_id, topic, public', [
      ['user_id', 'eq', this.authService.authUser?.id],
      ['subject_id', 'eq', subjectId],
    ]);
  }

  fetchPublicSheetsByQuery(query: ExcerciseSheetQuery) {
    return this.find(
      'id, number, user_id, subject_id, topic, public, user:user_id (name, university_id, course_id)',
      [
        ['public', 'eq', true],
        ['user.university_id', 'eq', Number(query.universityId)],
        ['user.course_id', 'eq', Number(query.courseId)],
        ['topic', 'ilike', `%${query.topic}%`],
      ]
    );
  }

  updateExcerciseSheet(id: string, data: Partial<IExerciseSheet>) {
    return this.update(id, data);
  }

  deleteExcerciseSheet(id: string) {
    return this.delete(id);
  }
}
