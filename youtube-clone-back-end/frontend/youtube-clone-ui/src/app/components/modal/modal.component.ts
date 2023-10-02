import { Component, ComponentRef, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  
  @ViewChild('header', { read: ViewContainerRef}) header!: ViewContainerRef;
  @ViewChild('modal') modal!: ElementRef<any>; 
  @Input() headerTemplate!: TemplateRef<any>;
  @Input() bodyTemplate!: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<any>;
  @Input() show: boolean;
  @Input() modalWidth: string = '85%';
  @Input() modalHeight: string = '100%';
  @Input() color: string = 'transparent';
  @Input() zIndex: string = '1';
  @Input() top: string = '0';
  @Input() left: string = '200px';

  @Output() isShowUpdateEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
    if(this.show) {
      //this.modal!.nativeElement.style.display = 'block';
    }
  }
  /**
   * on click event on document
   * @param event 
  */
  //@HostListener('document:click', ['$event'])
  //onClick(event: MouseEvent) {
  //  console.log('click on document ', this.show);
    //if clicked element is not inside modal
  //  if (this.show && !this.modal.nativeElement.contains(event.target)) {
  //    console.log('ddddisplay');
  //    this.modal.nativeElement.style.display = 'none';
  //  }
  //}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.show.currentValue) {
      console.log('inside ngOnChanges modal [TRUE] ', changes.show.currentValue);
      if(this.modal){
        this.modal.nativeElement.style.display = 'block';
      }
    }
    else {
      console.log('inside ngOnChanges modal [FALSE] ',changes.show.currentValue);
      this.modal.nativeElement.style.display = 'none';
    }
  }

  ngAfterViewInit() {
    console.log("after viewinit modal ", this.show);
    this.showModal(this.show);
  }

  showModal(show: boolean) {
    if(show) {
      console.log("after view inside if modal", show);
      this.modal.nativeElement.style.display = 'block';
    }
    else {
      this.modal.nativeElement.style.display = 'none';
    }
  }

  ngOnDestroy() : void {
    console.log("component being destroyed ")
  }

  closeModal(): void {
    this.isShowUpdateEvent.emit(!this.show);
    this.modal.nativeElement.style.display = 'none';
  }
}
