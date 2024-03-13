import { createFeature, createReducer, on } from "@ngrx/store";
import { StatusState } from "../../types/state/statusState.interface";
import { StatusActions } from "./actions";

const initialState: StatusState = {
    isLoading: false,
    data: null,
    validationMessages: null,
    validationErrors: null
};


export const statusFeature = createFeature({
    name: 'status',
    reducer: createReducer(
        initialState,
        on((StatusActions.getStatus), (state) => ({
            ...state,
            isLoading: true,
            validationErrors: null
        })),
        on((StatusActions.getStatusSuccess), (state, action) => ({
            ...state,
            isLoading: false,
            data: action.status,
            validationMessages: action.responseMessages
        })),
        on((StatusActions.getStatusFailure), (state, action) => ({
            ...state,
            isLoading: false,
            validationErrors: action.errors
        })),
    )
});

export const {
    name: statusFeatureKey,
    reducer: statusReducer,
    selectData: selectStatus,
    selectValidationMessages,
    selectValidationErrors
} = statusFeature