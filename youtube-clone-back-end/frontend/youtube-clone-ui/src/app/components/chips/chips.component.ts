import { Component } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent {
  newChipLabel: any;
  chips = [
    { label: 'Chip 1' },
    { label: 'Chip 2' },
    { label: 'Chip 3' },
  ];

  addChip() {
    if(this.newChipLabel){
      this.chips = [...this.chips, { label: this.newChipLabel}];
      this.newChipLabel = "";
    }
  }

  removeChip(chip: {label: string}) {
    console.log("chip name ", chip.label);
    this.chips.splice(this.chips.indexOf(chip), 1);
  }
}
