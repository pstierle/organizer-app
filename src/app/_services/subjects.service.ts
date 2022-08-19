import { Observable } from 'rxjs';
import { IExerciseSheet } from './../_models/IExerciseSheet';
import { AuthService } from './auth.service';
import { ISubject } from './../_models/ISubject';
import { Injectable } from '@angular/core';
import { BaseService } from './supabase.service';

export type SubjectWithExerciseSheet = ISubject & {
  excercise_sheets: IExerciseSheet[];
};

@Injectable({
  providedIn: 'root',
})
export class SubjectService extends BaseService<ISubject> {
  constructor(private authService: AuthService) {
    super('subjects');
  }

  queryByName(query: string) {
    return this.find(
      'id, name, semester',
      [
        ['user_id', 'eq', this.authService.authUser?.id],
        ['name', 'ilike', `%${query}%`],
      ],
      [0, 5],
      [['name', true]]
    );
  }

  fetchUserSubjects() {
    return this.find('id, name, semester', [
      ['user_id', 'eq', this.authService.authUser?.id],
    ]);
  }

  addSubject(subject: Partial<ISubject>) {
    return this.create({
      ...subject,
    });
  }

  fetchSubjectById(id: number) {
    return this.findByIdWithFilter(
      id,
      [['user_id', 'eq', this.authService.authUser?.id]],
      'id, name, semester, excercise_sheets(id, number)'
    ) as Observable<SubjectWithExerciseSheet>;
  }

  updateSubject(id: string, data: Partial<ISubject>) {
    return this.update(id, data);
  }

  deleteSubject(id: string) {
    return this.delete(id);
  }
}
