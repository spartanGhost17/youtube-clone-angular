import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [],
  exports: [
    MatSnackBarModule,
    MatRippleModule,
    MatFormFieldModule, 
    MatSelectModule,
    MatInputModule 
  ]
})
export class MaterialModule { }
