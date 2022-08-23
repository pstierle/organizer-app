import { BaseComponent } from './../../../_utils/base.component';
import { selectCoursesAsOptions } from './../../../_store/courses/courses.select';
import { getUniversities } from './../../../_store/universities/universities.actions';
import { nullableOptions } from './../../../_utils/select.util';
import { selectUniversitiesAsOptions } from './../../../_store/universities/universities.select';
import { ISelectOption } from './../../../_models/ISelectOption';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { getCourses } from 'src/app/_store/courses/courses.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: [],
})
export class RegisterPage extends BaseComponent implements OnInit, OnDestroy {
  universityOptions: ISelectOption[] = [];
  courseOptions: ISelectOption[] = [];

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    university_id: new FormControl('', []),
    course_id: new FormControl('', []),
  });

  emailSent = false;

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
  }

  async onSubmit() {
    const universityId =
      this.registerForm.get('university_id')?.value === ''
        ? undefined
        : Number(this.registerForm.get('university_id')?.value);
    const courseId =
      this.registerForm.get('course_id')?.value === ''
        ? undefined
        : Number(this.registerForm.get('course_id')?.value);

    const error = await this.authService.signUp(
      this.registerForm.get('email')?.value ?? '',
      this.registerForm.get('password')?.value ?? '',
      this.registerForm.get('name')?.value ?? '',
      universityId,
      courseId
    );
    if (!error) this.emailSent = true;
  }
}
