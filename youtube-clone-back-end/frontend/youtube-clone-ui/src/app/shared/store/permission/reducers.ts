import { createFeature, createReducer, on } from "@ngrx/store";
import { GlobalPermissionStateInterface } from "../../types/state/permissionState.interface";
import { permissionsActions } from "./actions";

export const initialState: GlobalPermissionStateInterface = {
    isLoading: false,
    data: [],
    validationMessages: null,
    validationErrors: null
}

export const permissionsFeature = createFeature({
    name: 'permissions',
    reducer: createReducer(
        initialState,
        on(permissionsActions.loadAllPermissions, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(permissionsActions.loadAllPermissionsSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            data: action.roles,
            validationMessages: action.responseMessage
        })),
        on(permissionsActions.loadAllPermissionsFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validationErrors: action.errors
        }))
    )
});

export const {
    name: permissionsFeatureKey,
    reducer: permissionsReducer,
    selectData: selectPermissionsData,
    selectIsLoading,
    selectValidationMessages,
    selectValidationErrors
} = permissionsFeature