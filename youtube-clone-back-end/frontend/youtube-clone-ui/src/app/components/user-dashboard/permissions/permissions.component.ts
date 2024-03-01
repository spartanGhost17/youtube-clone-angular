import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardDropdownComponent } from '../../dropdown/standard-dropdown/standard-dropdown.component';
import { Role } from '../../../shared/types/Role';
import { MaterialModule } from '../../../module/material/material.module';
import { NgModel } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GlobalPermissionStateInterface } from '../../../shared/types/permissionState.interface';
import { permissionsActions } from '../../../shared/store/permission/actions';
import { ResponseMessagesInterface } from '../../../shared/types/responseMessages.interface';
import { Observable, combineLatest } from 'rxjs';
import {
  selectAuthState,
  selectCurrentUser,
  selectIsLoading,
  selectValidationErrors,
  selectValidationMessages,
} from '../../auth/store/reducers';
import { selectPermissionsData } from '../../../shared/store/permission/reducers';
import { AuthStateInterface } from '../../auth/types/authState.interface';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, StandardDropdownComponent, MaterialModule],
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent {
  roles: any[] = [];
  selectedRole: Role;
  permissions: string = '';
  currentUser: CurrentUserInterface | null | undefined;

  data$: Observable<{
    isLoading: boolean;
    data: Role[];
    validationMessages: ResponseMessagesInterface | null;
    validationErrors: ResponseMessagesInterface | null;
  }>;

  constructor(
    private store: Store<{ auth: AuthStateInterface, permissions: GlobalPermissionStateInterface }>
  ) {}

  ngOnInit(): void {
    console.log("loading data...")
    this.combineLatestUpdates();
    this.getCurrentUserState();
  }

  /**
   * get user state
  */
  getCurrentUserState() {
    this.store.select(selectCurrentUser).subscribe({
      next: (user) => {
        this.selectedRole =  user!.authorities![0];
        this.permissions = this.selectedRole.permissions;
      }
    });
  }

  /**
   * combine latest updates from observable
   */
  combineLatestUpdates() {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      data: this.store.select(selectPermissionsData),
      validationMessages: this.store.select(selectValidationMessages),
      validationErrors: this.store.select(selectValidationErrors),
    });
  }

  /**
   * change the selected role 
   * @param role 
  */
  onOptionSelected(role: Role) {
    console.log(role);
    this.permissions = role.permissions;
  }

}
