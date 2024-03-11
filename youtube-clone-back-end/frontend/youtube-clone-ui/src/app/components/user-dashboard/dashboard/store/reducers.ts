import { createFeature, createReducer, on } from "@ngrx/store";
import { VideoCategoriesState } from "../types/videoCategoryState.interface";
import { dashboardActions } from "./actions";

const initialState: VideoCategoriesState = {
    categories: [],
    validationMessages: null,
    validationErrors: null
};

const categoryFeature = createFeature({
    name: 'dashboard',
    reducer: createReducer(
        initialState,
        on(dashboardActions.getAllCategories, (state) => ({
            ...state,
            //categories: [],
            validationMessages: null,
            validationErrors: null
        })),
        on(dashboardActions.getAllCategoriesSuccess, (state, action) => ({
            ...state,
            categories: action.categories,
            validationMessages: action.responseMessages
        })),
        on(dashboardActions.getAllCategoriesFailure, (state, action) => ({
            ...state,
            validationErrors: action.errors
        }))
    )
});

export const {
    name: dashboardFeatureKey,
    reducer: dashboardReducer,
    selectCategories,
    selectValidationMessages,
    selectValidationErrors
} = categoryFeature;
  