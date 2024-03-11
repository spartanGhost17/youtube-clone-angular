import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpResponseInterface } from "../../../../shared/types/httpResponse.interface";
import { ResponseMessagesInterface } from "../../../../shared/types/responseMessages.interface";
import { toResponseMessage } from "../../../../shared/utils/sharedUtils";
import { DashboardService } from "../services/dashboard.service";
import { CategoryInterface } from "../types/category.interface";
import { dashboardActions } from "./actions";

export const dashboardEffect = createEffect(
    (
      //get all actions
      actions$ = inject(Actions),
      dashboardService = inject(DashboardService)
    ) => {
      return actions$.pipe(
        ofType(dashboardActions.getAllCategories), //limit to actions of this type (login is start of login process)
        switchMap(() => {
          //progressBarService.startLoading(); //start progress
          return dashboardService.getAllCategories().pipe(
            map((response: HttpResponseInterface<CategoryInterface[]>) => {
              const categories: CategoryInterface[] = response.data.category;
              //progressBarService.completeLoading(); //stop progress
                console.log("CATEGORIES ====>>>>> ",categories)
              const responseMessages: ResponseMessagesInterface = toResponseMessage(response)
  
              return dashboardActions.getAllCategoriesSuccess({
                categories: categories,
                responseMessages: responseMessages//toResponseMessage(response), //map fields to ResponseMessageInterface
              });
            }),
            catchError((error: HttpErrorResponse) => {
              //progressBarService.completeLoading();
              return of(
                dashboardActions.getAllCategoriesFailure({
                  errors: toResponseMessage(error.error),
                })
              ); //return observable
            })
          ); //do transformation
        }), //switch map returns a new observable
      ); //group actions
    },
    { functional: true }
  );