import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { selectUniversities } from 'src/app/_store/universities/universities.select';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: [],
})
export class RegisterPage implements OnInit, OnDestroy {
  universitiesAsOptions: { label: string; value: any }[] = [];
  subscription: Subscription | null = null;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    university_id: new FormControl('', []),
  });

  emailSent = false;

  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectUniversities)
      .subscribe((universities) => {
        const mapped = universities.map((universitiy) => {
          return {
            label: universitiy.name,
            value: universitiy.id,
          };
        });
        this.universitiesAsOptions = mapped;
        console.log(this.universitiesAsOptions);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  async onSubmit() {
    const error = await this.authService.signUp(
      this.registerForm.get('email')?.value ?? '',
      this.registerForm.get('password')?.value ?? '',
      this.registerForm.get('name')?.value ?? '',
      this.registerForm.get('university_id')?.value ?? undefined
    );
    if (!error) this.emailSent = true;
  }
}
