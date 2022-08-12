import { IUniversity } from './../_models/IUniversity';
import { Injectable } from '@angular/core';
import { BaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class UniversitiesService extends BaseService<IUniversity> {
  constructor() {
    super('universities');
  }

  fetchAll() {
    return this.find([], '*');
  }
}
