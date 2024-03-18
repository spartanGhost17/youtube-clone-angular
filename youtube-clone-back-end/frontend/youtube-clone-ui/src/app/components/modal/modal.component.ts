import { Component, ComponentRef, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NgClass, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { style } from '@angular/animations';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: true,
    imports: [NgStyle, NgTemplateOutlet, NgIf, NgClass]
})
export class ModalComponent {
  
  @ViewChild('header', { read: ViewContainerRef}) header!: ViewContainerRef;
  @ViewChild('modal') modal!: ElementRef<any>; 
  @Input() headerTemplate!: TemplateRef<any>;
  @Input() bodyTemplate!: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<any>;
  @Input() show: boolean;
  @Input() modalWidth: string = '60%';//'85%';
  @Input() modalHeight: string = '100%';
  @Input() color: string = 'rgba(40, 40, 40, 1)';//'transparent';
  @Input() zIndex: string = '4';
  @Input() top: string = '0';
  @Input() left: string = '0px';//'200px';
  @Input() bodyHeight: string = '80%';

  @Output() isShowUpdateEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.show.currentValue) {
      if(this.modal){
        this.modal.nativeElement.style.display = 'block';
      }
    }
  }

  ngAfterViewInit() {
    this.showModal(this.show);
  }

  showModal(show: boolean) {
    if(show) {
      this.modal.nativeElement.style.display = 'block';
    }
    else {
      this.modal.nativeElement.style.display = 'none';
    }
  }

  ngOnDestroy() : void {
  }

  closeModal(): void {
    this.isShowUpdateEvent.emit(!this.show);
    this.modal.nativeElement.style.display = 'none';
  }
}
