import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Tag } from '../../models/tag';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-chips',
    templateUrl: './chips.component.html',
    styleUrls: ['./chips.component.scss'],
    standalone: true,
    imports: [NgFor, NzIconModule, NzButtonModule, FormsModule]
})
export class ChipsComponent {
  newChipLabel: string;
  @Input() chips: Tag[] = [];
  @Output() chipsUpdated: EventEmitter<any[]> = new EventEmitter<any[]>(); 


  addChip() {
    if(this.newChipLabel && this.newChipLabel.trim() !== '' && !this.chips.some(chip => chip.tagName!.toLocaleLowerCase() === this.newChipLabel.toLocaleLowerCase())){
      this.chips = [...this.chips, { tagName: this.newChipLabel}];
      this.chipsUpdated.emit(this.chips);
    }
    this.newChipLabel = "";
  }

  removeChip(chip: Tag) {
    console.log("chip name ", chip.tagName!);
    this.chips.splice(this.chips.indexOf(chip), 1);
    this.chipsUpdated.emit(this.chips);
  }
}
