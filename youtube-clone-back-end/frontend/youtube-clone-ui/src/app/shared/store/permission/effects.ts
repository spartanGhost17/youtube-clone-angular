import { Actions, createEffect, ofType } from "@ngrx/effects";
import { permissionsActions } from "./actions";
import { RoleService } from "../../services/role/role.service";
import { catchError, map, of, switchMap } from "rxjs";
import { inject } from "@angular/core";
import { HttpResponseInterface } from "../../types/httpResponse.interface";
import { Role } from "../../types/Role";
import { HttpErrorResponse } from "@angular/common/http";
import { toResponseMessage } from "../../utils/sharedUtils";

export const getAllPermissionsEffect = createEffect((
    actions$ = inject(Actions),
    roleService = inject(RoleService)
) => {
    return actions$.pipe(
        ofType(permissionsActions.loadAllPermissions),
        switchMap(() => {
            return roleService.getRoles().pipe(
                map((response: HttpResponseInterface<Role>) => {
                    return permissionsActions.loadAllPermissionsSuccess({
                        roles: response.data['roles'],
                        responseMessage: toResponseMessage(response)
                    });
                }),
                catchError((error: HttpErrorResponse) => {
                    return of(permissionsActions.loadAllPermissionsFailure({
                        errors: toResponseMessage(error.error)
                    }))
                })
            ); 
        })
    );
}, {functional: true}
);