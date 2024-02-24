import { Component, ElementRef, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { NgStyle, NgFor, NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-steps',
    templateUrl: './steps.component.html',
    styleUrls: ['./steps.component.scss'],
    standalone: true,
    imports: [NgStyle, NgFor, NgClass, NgIf]
})
export class StepsComponent {

  @ViewChild('progress') progress: ElementRef<any>;
  @ViewChild('prev') prev: ElementRef<any>;
  @ViewChild('next') next: ElementRef<any>;
  @ViewChildren('step') stepList: QueryList<ElementRef>;
  @Input() steps: any[] = [];
  @Input() currentActive: number = 0;
  @Input() templates: QueryList<TemplateRef<any>>;//any[];
  @Input() completed: boolean = false;
  @Output() activeSection: EventEmitter<number> = new EventEmitter();
  
  firstStep: any;
  circles: any;
  progressBarLength: string = '0px';

  //currentActive: number = 1;

  constructor() {}


  ngOnInit(): void {
    this.steps = [
      { text: 'Details', icon: 'home'},
      { text: 'Video elements' },//, icon: 'grade'},
      { text: 'Checks'},//, icon: 'radio_button_checked'},
      { text: 'Visibility'}//, icon: 'sync'}
    ];
  }

  ngAfterViewInit(): void {
    this.firstStep = this.stepList.first;
  }

  onStepClicked(index: any): void {
    console.log("index ", index);
    this.currentActive = index;//+1;
    this.emitActiveSection();
    this.update();
    //this.currentActive = index;
  }

  onNext(): void {
    this.currentActive++;
    if(this.currentActive > this.stepList.length) {
      this.currentActive = this.stepList.length;
    }
    this.emitActiveSection();
    this.update();
  }

  /**
   * on previous clicked 
  */
  onPrev(): void {
    this.currentActive--;
    if(this.currentActive < 1) {
      this.currentActive = 0;
    }
    this.emitActiveSection();
    this.update();
  }

  emitActiveSection(): void {
    this.activeSection.emit(this.currentActive);
  }

  /**
   * Update active steps (steps that have been visited) 
   * update progress bar to reach center coordinates of current step 
  */
  update() {
    const firstBoundingBox = this.firstStep.nativeElement.getBoundingClientRect();
    const firstCenterX = firstBoundingBox.left + firstBoundingBox.width / 2;


    this.stepList.forEach((step, idx) => {
      if(idx <= this.currentActive){
        const boundingBox = step.nativeElement.getBoundingClientRect();
        const currentCenterX = boundingBox.left + boundingBox.width / 2;
        
        const distance = Math.abs(currentCenterX - firstCenterX);

        console.log(`current center ${currentCenterX} first center ${firstCenterX}`);

        this.progressBarLength = `${distance}px`;//`${currentCenterX}px`;
        step.nativeElement.classList.add("active");
      }
      else {
        step.nativeElement.classList.remove("active");
      }
    })
  }

}
