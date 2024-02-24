import { Component } from '@angular/core';

import { NzDrawerPlacement, NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-drawer',
    templateUrl: './drawer.component.html',
    styleUrls: ['./drawer.component.scss'],
    standalone: true,
    imports: [FormsModule, NzButtonModule, NzWaveModule, NzDrawerModule]
})
export class DrawerComponent {
  visible = false;
  placement: NzDrawerPlacement = 'left';
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
