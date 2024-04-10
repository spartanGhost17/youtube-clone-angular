import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthStateInterface } from '../../types/authState.interface';
import { authActions } from '../../store/actions';
import { UpdatePasswordFormInterface } from '../../types/updatePasswordForm.interface';
import { selectAuthState, selectIsPasswordLinkValid, selectIsResetPasswordEmailSent, selectValidationErrors, selectValidationMessages } from '../../store/reducers';
import { Observable, combineLatest } from 'rxjs';
import { ResponseMessagesInterface } from '../../../../shared/types/responseMessages.interface';
import { VerifyPasswordInterface } from '../../types/verifyPassword.interface';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  @ViewChild('passwordInput') passwordInput: ElementRef<any>;
  showPassword: boolean = false;
  resetFormGroup: FormGroup;
  isResetEmailSent: boolean = false;
  isPasswordLinkValid: boolean = false;
  type: string;
  key: string;
  currentType: string;
  currentKey: string;
  data$: Observable<{
    isResetEmailSent: boolean;
    isPasswordLinkValid: boolean;
    validationMessages: ResponseMessagesInterface | null;
    validationErrors: ResponseMessagesInterface | null;
  }>;
  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>,
    private route: ActivatedRoute
  ) {}

  /**
   * lifecycle hook 
  */
  ngOnInit() {
    /*this.isResetEmailSent$ = this.store.select(selectIsResetPasswordEmailSent);
    this.validationMessages$ = this.store.select(selectValidationMessages);
    this.validationErrors$ = this.store.select(selectValidationErrors);
    this.isPasswordLinkValid$ = this.store.select(selectIsPasswordLinkValid);*/

    this.data$ = combineLatest({
      isResetEmailSent: this.store.select(selectIsResetPasswordEmailSent),
      validationMessages: this.store.select(selectValidationMessages),
      validationErrors: this.store.select(selectValidationErrors),
      isPasswordLinkValid: this.store.select(selectIsPasswordLinkValid)
    });

    this.openSubscriptions();
    this.resetFormGroup = this.createForm();   
  }

  /**
   * open the ngrx subscriptions 
  */
  openSubscriptions() {
    this.data$.subscribe({
      next: (data) => {
        if(data.isPasswordLinkValid) {
          this.isPasswordLinkValid = data.isPasswordLinkValid;
          this.resetFormGroup = this.createForm();  
        }
        if(data.isResetEmailSent) {
          this.isResetEmailSent = data.isResetEmailSent;
        }
      }
    });

    this.store.select(selectAuthState).subscribe({
      next: (authState) => {}
    });
  }

  /**
   * lifecycle hook 
  */
  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.type = params['type'];
      this.key = params['key'];
      const isPasswordResetLinkValid = (this.currentKey !== this.key && this.currentType !== this.type);
      if(isPasswordResetLinkValid) {
        this.currentKey = this.key;
        this.currentType = this.type;
        if (this.type && this.key) {
          const verifyResetLink: VerifyPasswordInterface = {
            type: this.type,
            key: this.key
          };
          this.verifyResetLink(verifyResetLink);
          //if key and link type are present
          //this.resetFormGroup = this.createForm();
        }
      }
    });
  }

  /**
   * check if submit conditions have been met before sending form
   * if isResetEmailSent
   */
  onSubmit() {
    if (this.resetFormGroup.valid) {
      if ((this.isResetEmailSent && !this.isPasswordLinkValid) || !this.isResetEmailSent) {
        this.store.dispatch(
          authActions.resetPassword({
            request: this.resetFormGroup.value.email,
          })
        );
      } else {
        const updatePassword: UpdatePasswordFormInterface = {
          password: this.resetFormGroup.value.password,
          confirmedPassword: this.resetFormGroup.value.confirmPassword,
        };
        //dispatch action
        this.store.dispatch(
          authActions.renewPassword({
            request: updatePassword,
            key: this.key
          })
        );
      }
    } else {
      //console.error('Invalid form');
    }
  }

  /**
   *  Toggle the input type between "password" and "text"
   */
  togglePasswordVisibility(input: any) {
    this.showPassword = !this.showPassword;
    input.type = input.type === 'password' ? 'text' : 'password';
  }


  /**
   * verify the reset password link
   * @param {VerifyPasswordInterface} verifyLinkForm 
  */
  verifyResetLink(verifyLinkForm: VerifyPasswordInterface): void {
    this.store.dispatch(authActions.verifyResetLink({
      request: verifyLinkForm
    }));
  }

  /**
   * Create a form group with email only if start of reset prosses,
   * else create a form group with password and confirmed password
   * @returns {FormGroup} the form group
   */
  createForm(): FormGroup<any> {
    if (!this.isPasswordLinkValid || !this.isResetEmailSent) {
      return this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
    } else {
      return this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      });
    }
  }
}
