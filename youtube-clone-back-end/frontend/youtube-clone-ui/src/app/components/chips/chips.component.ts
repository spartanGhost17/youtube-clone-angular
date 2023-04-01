import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent {
  newChipLabel: string;
  chips: any[] = [];
  @Output() chipsUpdated: EventEmitter<any[]> = new EventEmitter<any[]>();

  addChip() {
    if(this.newChipLabel && this.newChipLabel.trim() !== '' && !this.chips.some(chip => chip.label.toLocaleLowerCase() === this.newChipLabel.toLocaleLowerCase())){
      this.chips = [...this.chips, { label: this.newChipLabel}];
      this.chipsUpdated.emit(this.chips);
    }
    this.newChipLabel = "";
  }

  removeChip(chip: {label: string}) {
    console.log("chip name ", chip.label);
    this.chips.splice(this.chips.indexOf(chip), 1);
    this.chipsUpdated.emit(this.chips);
  }
}
