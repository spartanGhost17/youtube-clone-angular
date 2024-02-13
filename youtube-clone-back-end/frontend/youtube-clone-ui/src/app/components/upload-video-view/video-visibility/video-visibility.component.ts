import { Component, ViewChildren, QueryList, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-video-visibility',
  templateUrl: './video-visibility.component.html',
  styleUrls: ['./video-visibility.component.scss']
})
export class VideoVisibilityComponent {
  @ViewChildren('radioHalo') radio: QueryList<any>;
  @Output() selected: EventEmitter<string> = new EventEmitter;  
  constructor() {}

  highlightBackground(radioHalo: any): void {

    /*console.log(" RADIO ", radioHalo);
    this.radio.forEach((radio, idx) => {
      console.log(" =========== \n");
      console.log(radio);
      if (radio.nativeElement === radioHalo) {
        radio.nativeElement.classList.add('clicked-radio-halo');
        setTimeout(() => {
        //  this.selectedOption = null;
        }, 1000); // 1 second
      } else {
        radio.nativeElement.classList.remove('clicked-radio-halo');
      }

    });*/
  }

  onRadioBtnClicked(value: string) {
    console.log("radioBtnClicked ", value)
    this.selected.emit(value);
  }
}
