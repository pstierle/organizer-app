import { AuthService } from './auth.service';
import { ISubject } from './../_models/ISubject';
import { Injectable } from '@angular/core';
import { BaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class SubjectService extends BaseService<ISubject> {
  constructor(private authService: AuthService) {
    super('subjects');
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

  fetchById(id: number) {
    return this.findByIdWithFilter(
      id,
      [['user_id', 'eq', this.authService.authUser?.id]],
      'id, name, semester'
    );
  }
}
