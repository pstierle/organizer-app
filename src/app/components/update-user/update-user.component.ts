import { BaseComponent } from './../../_utils/base.component';
import { selectCoursesAsOptions } from './../../_store/courses/courses.select';
import { ISelectOption } from './../../_models/ISelectOption';
import { selectUniversitiesAsOptions } from './../../_store/universities/universities.select';
import { IUser } from './../../_models/IUser';
import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/_services/auth.service';
import { nullableOptions } from 'src/app/_utils/select.util';
import { getCourses } from 'src/app/_store/courses/courses.actions';
import { getUniversities } from 'src/app/_store/universities/universities.actions';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: [],
})
export class UpdateUserComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  user: IUser | null = null;
  loading = false;
  universityOptions: ISelectOption[] = [];
  courseOptions: ISelectOption[] = [];
  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    university_id: new FormControl('', []),
    course_id: new FormControl('', []),
  });

  async onSubmit() {
    if (!this.user) return;
    const universityId =
      this.updateForm.get('university_id')?.value === ''
        ? null
        : Number(this.updateForm.get('university_id')?.value);
    const courseId =
      this.updateForm.get('course_id')?.value === ''
        ? null
        : Number(this.updateForm.get('course_id')?.value);
    this.loading = true;
    await this.authService.updateProfile({
      id: this.user.id,
      name: this.updateForm.get('name')?.value ?? '',
      university_id: universityId,
      course_id: courseId,
    });
    this.loading = false;
  }

  constructor(private authService: AuthService, private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(getUniversities());
    this.store.dispatch(getCourses());

    this.store
      .select(selectUniversitiesAsOptions)
      .pipe(takeUntil(this.destroy$))
      .subscribe((universitiesAsOptions) => {
        this.universityOptions = nullableOptions(universitiesAsOptions);
      });

    this.store
      .select(selectCoursesAsOptions)
      .pipe(takeUntil(this.destroy$))
      .subscribe((coursesAsOptions) => {
        this.courseOptions = nullableOptions(coursesAsOptions);
      });

    this.authService
      .getUser$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.user = user;
        if (this.user) {
          this.updateForm.controls['name'].setValue(this.user.name);
          if (this.user.university_id)
            this.updateForm.controls['university_id'].setValue(
              String(this.user.university_id)
            );
          if (this.user.course_id)
            this.updateForm.controls['course_id'].setValue(
              String(this.user.course_id)
            );
        }
      });
  }
}
