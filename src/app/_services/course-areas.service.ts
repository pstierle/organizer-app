import { ICourseArea } from './../_models/ICourseArea';
import { Injectable } from '@angular/core';
import { BaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class CourseAreaService extends BaseService<ICourseArea> {
  constructor() {
    super('course_areas');
  }

  fetchAll() {
    return this.find('id, name');
  }
}
