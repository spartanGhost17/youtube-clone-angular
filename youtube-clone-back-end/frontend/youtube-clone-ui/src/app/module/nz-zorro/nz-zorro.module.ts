import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPopoverModule } from 'ng-zorro-antd/popover';


@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzUploadModule,
    NzPageHeaderModule,
    NzInputModule,
    NzAvatarModule,
    NzModalModule,
    NzDrawerModule,
    NzDividerModule,
    NzStepsModule,
    NzGridModule,
    NzImageModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzPopoverModule,
  ]
})
export class NzZorroModule { }
