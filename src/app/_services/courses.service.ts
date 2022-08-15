import { Injectable } from '@angular/core';
import { ICourse } from '../_models/ICourse';
import { BaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends BaseService<ICourse> {
  constructor() {
    super('courses');
  }

  fetchAll() {
    return this.find('id, name, course_area_id');
  }
}
