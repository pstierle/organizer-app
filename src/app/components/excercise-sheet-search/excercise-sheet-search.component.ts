import {
  ExcerciseSheetService,
  ExcerciseSheetQuery,
} from './../../_services/excercise-sheet.service';
import { IUser } from './../../_models/IUser';
import { IExerciseSheet } from 'src/app/_models/IExerciseSheet';
import { nullableOptions } from 'src/app/_utils/select.util';
import { BaseComponent } from './../../_utils/base.component';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  takeUntil,
  Observable,
  of,
  BehaviorSubject,
  combineLatest,
  Subject,
  debounce,
  debounceTime,
} from 'rxjs';
import { ISelectOption } from 'src/app/_models/ISelectOption';
import { getCourses } from 'src/app/_store/courses/courses.actions';
import { selectCoursesAsOptions } from 'src/app/_store/courses/courses.select';
import { getUniversities } from 'src/app/_store/universities/universities.actions';
import { selectUniversitiesAsOptions } from 'src/app/_store/universities/universities.select';

@Component({
  selector: 'app-excercise-sheet-search',
  templateUrl: './excercise-sheet-search.component.html',
  styleUrls: [],
})
export class ExcerciseSheetSearchComponent extends BaseComponent {
  universityOptions: ISelectOption[] = [];
  courseOptions: ISelectOption[] = [];
  query$ = new Subject<ExcerciseSheetQuery>();
  results: IExerciseSheet[] = [];
  topicQuery = '';
  universityIdQuery = '';
  courseIdQuery = '';

  constructor(
    private store: Store,
    private excerciseSheetService: ExcerciseSheetService
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(getUniversities());
    this.store.dispatch(getCourses());

    this.store
      .select(selectUniversitiesAsOptions)
      .pipe(takeUntil(this.destroy$))
      .subscribe((universitiesAsOptions) => {
        this.universityOptions = nullableOptions('Alle', universitiesAsOptions);
      });

    this.store
      .select(selectCoursesAsOptions)
      .pipe(takeUntil(this.destroy$))
      .subscribe((coursesAsOptions) => {
        this.courseOptions = nullableOptions('Alle', coursesAsOptions);
      });

    this.query$
      .pipe(takeUntil(this.destroy$), debounceTime(400))
      .subscribe(async (query) => {
        this.results =
          await this.excerciseSheetService.fetchPublicSheetsByQuery(query);
      });
  }

  handleTopicChange(topic: string) {
    this.query$.next({
      ...this.query,
      topic,
    });
  }

  handleUniversityChange(universityId: string) {
    this.query$.next({
      ...this.query,
      universityId,
    });
  }

  handleCourseChange(courseId: string) {
    this.query$.next({
      ...this.query,
      courseId,
    });
  }

  get query() {
    return {
      topic: this.topicQuery,
      universityId: this.universityIdQuery,
      courseId: this.courseIdQuery,
    };
  }
}
