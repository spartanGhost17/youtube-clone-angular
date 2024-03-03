import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ReportTypeInterface } from '../../shared/types/reportType.interface';

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent {
  @ViewChildren('radioHalo') radio: QueryList<any>;
  @Output() selected: EventEmitter<any> = new EventEmitter;
  @Input() data: ReportTypeInterface[];


  highlightBackground(radioHalo: any): void {
  }

  /**
   * on radio button clicked 
   * @param value the selected value
  */
  onRadioBtnClicked(value: any) {
    console.log(value)
    this.selected.emit(value);
  }
}
