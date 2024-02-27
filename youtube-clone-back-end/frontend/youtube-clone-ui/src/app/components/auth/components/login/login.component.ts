import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authActions } from '../../store/actions';
import { selectAuthState, selectIsSubmitting, selectValidationErrors, selectValidationMessages } from '../../store/reducers';
import { AuthStateInterface } from '../../types/authState.interface';
import { LoginFormInterface } from '../../types/loginForm.interface';
import { ResponseMessagesInterface } from '../../../../shared/types/responseMessages.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showPassword: boolean = false;
  loginFormGroup: FormGroup;

  isSubmitting$: Observable<boolean>;
  isSubmitting: boolean;
  validationMessages$: Observable<ResponseMessagesInterface | null>;
  validationErrors$: Observable<ResponseMessagesInterface | null>;

  @ViewChild('passwordInput') passwordInput: ElementRef<any>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>,
    private router: Router
  ) {}

  /**
   * lifecycle hook
   */
  ngOnInit() {
    this.loginFormGroup = this.fb.nonNullable.group({
      username: ['goku@example.com', Validators.required],
      password: ['123456', Validators.required],
    });

    this.isSubmitting$ = this.store.select(selectIsSubmitting);
    this.isSubmitting$.subscribe((data) => {
      this.isSubmitting = data;
    });
    this.validationMessages$ = this.store.select(selectValidationMessages);
    this.validationErrors$ = this.store.select(selectValidationErrors);
    /*this.validationMessages$.subscribe((validation) => {
      if(validation) {
        this.router.navigate(['/home/explore']);
      }
    });*/

  }

  ngAfterViewInit() {
    this.store.select(selectAuthState).subscribe({
      next: (authState) => {console.log("AUTH STATE \n"); console.log(authState)},
      error: (error) => {console.log(error)}
    })
  }

  /**
   * check if submit conditions have been met before sending form
   */
  onSubmit() {
    if (this.loginFormGroup.valid) {
      console.log(`FORM VALUES ${this.loginFormGroup.value.username}`);
      console.log(`FORM VALUES ${this.loginFormGroup.value.password}`);
      const loginRequest: LoginFormInterface = {
        username: this.loginFormGroup.value.username,
        password: this.loginFormGroup.value.password,
      };
      this.store.dispatch(authActions.login({ request: loginRequest })); //dispatch current action
    } else {
      console.error('Invalid form');
      console.log(`ERROR VALUES ${this.loginFormGroup.value}`);
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
