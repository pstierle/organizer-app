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

  async fetchPublicSheetsByQuery(query: ExcerciseSheetQuery) {
    const { data } = await this.supabase
      .from('excercise_sheets')
      .select(
        'id, number, user_id, subject_id, topic, public, users:user_id(name)'
      )
      .eq('public', true)
      .eq('users.university_id', Number(query.universityId))
      .eq('users.course_id', Number(query.courseId))
      .ilike('topic', `%${query.topic}%`);

    return data ?? [];
  }

  updateExcerciseSheet(id: string, data: Partial<IExerciseSheet>) {
    return this.update(id, data);
  }

  deleteExcerciseSheet(id: string) {
    return this.delete(id);
  }
}
