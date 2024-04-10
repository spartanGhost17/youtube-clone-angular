import { Component } from '@angular/core';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss'],
    standalone: true
})
export class SwitchComponent {
  clicked: boolean = false;

  constructor() {}

  ngOnInit() {}

  onCheckboxClick(event: any) {
    if(event.target.checked !== undefined) {
    }
  }
}
