import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: [],
})
export class RegisterPage {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  emailSent = false;

  constructor(private authService: AuthService) {}

  async onSubmit() {
    const error = await this.authService.signUp(
      this.registerForm.get('email')?.value ?? '',
      this.registerForm.get('password')?.value ?? '',
      this.registerForm.get('name')?.value ?? ''
    );
    if (!error) this.emailSent = true;
  }
}
