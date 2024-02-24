import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [],
  exports: [
    MatSnackBarModule,
    MatRippleModule
  ]
})
export class MaterialModule { }
