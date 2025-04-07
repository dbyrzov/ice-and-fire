import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadProfileSuccess } from '../../../../store/profile/profile.actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private store = inject(Store);
  private router = inject(Router);

  loginForm = this.buildLoginForm();

  onLogin() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.getUsername.value, this.getPassword.value)
        .subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token);
            this.store.dispatch(loadProfileSuccess({ profile: response.user }));
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Login failed:', error);
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  buildLoginForm() {
    return new FormGroup({
      username: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  get getUsername() {
    return this.loginForm.get('username') as FormControl<string>;
  }
  get getPassword() {
    return this.loginForm.get('password') as FormControl<string>;
  }
}
