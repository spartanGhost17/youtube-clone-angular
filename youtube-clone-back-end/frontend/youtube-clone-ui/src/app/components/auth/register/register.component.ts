import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { RegisterFormInterface } from '../types/registerForm.interface';
import { Store } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { authActions } from '../store/actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class RegisterComponent {
  showPassword: boolean = false;
  registerFormGroup: FormGroup;
  isSubmitting$: Observable<boolean>;
  @ViewChild("passwordInput") passwordInput: ElementRef<any>;
  @ViewChild("formContainer") formContainer: ElementRef<any>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthStateInterface>
  ) {}
  /**
   * lifecycle init hook
   */
  ngOnInit(): void {
    this.registerFormGroup = this.fb.nonNullable.group({
      firstname: ['Ted', Validators.required],
      lastname: ['Cruiz', Validators.required],
      username: ['tempo_ace', Validators.required],
      email: ['tempo@example.com', Validators.email],
      password: ['123456', Validators.required],
    });
  }

  /**
   * on form submit
   */
  onSubmit(): void {
    if (this.registerFormGroup.valid) {
      const registrationForm: RegisterFormInterface = {
        firstName: this.registerFormGroup.value.firstname,
        lastName: this.registerFormGroup.value.lastname,
        username: this.registerFormGroup.value.username,
        email: this.registerFormGroup.value.email,
        password: this.registerFormGroup.value.password,
      };
      
      console.log("valid form");
      console.log(registrationForm);
      this.store.dispatch(authActions.register({ request: registrationForm }));
    } else {
      console.log("invalid");
      console.log(this.registerFormGroup.value)
    } 
  }

  /**
   *  Toggle the input type between "password" and "text"
   */
  togglePasswordVisibility(input: any) {
    this.showPassword = !this.showPassword;
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
