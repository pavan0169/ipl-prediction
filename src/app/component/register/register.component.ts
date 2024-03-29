import { AuthService } from './../../shared/auth.service';
import { Component, inject } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder, ValidatorFn, AbstractControl} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loginForm: FormGroup;
  authService = inject(AuthService);

  constructor(private formBuilder: FormBuilder, public router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      displayname: ['', [Validators.required, this.displayNameValidator()]]
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.authService.register(this.loginForm.value.displayname, this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: () => {
        this.router.navigate(['/login']);
        alert('Registeration Successful');
      }, error: (err) => {
        alert(err.code);
      }});
    }
  }

  resetForm() {
    this.loginForm.reset();
  }

  navigateToRegister() {
    this.router.navigate(['/login']);
  }

  displayNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const displayName = control.value;
      if (/\s/.test(displayName) || !/^[a-zA-Z0-9]+$/.test(displayName)) {
        return { 'invalidDisplayName': true };
      }
      return null;
    };
  }
}
