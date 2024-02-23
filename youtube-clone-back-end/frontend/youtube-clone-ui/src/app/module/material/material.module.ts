import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';  
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    DragDropModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatRippleModule,
  ]
})
export class MaterialModule { }
