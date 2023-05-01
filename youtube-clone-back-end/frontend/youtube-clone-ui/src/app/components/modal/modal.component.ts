import { Component, ElementRef, HostListener, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  
  @ViewChild('header', { read: ViewContainerRef}) header!: ViewContainerRef;
  @ViewChild('modal') modal: ElementRef<any>; 
  @Input() headerTemplate!: TemplateRef<any>;
  @Input() bodyTemplate!: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<any>;
  @Input() show: boolean = false;

  constructor() {

  }

  /**
   * if scrubbing on continue scrubbing outside timeline container
   * @param event mouseup event
   */
  @HostListener('document:click', ['$event']) 
  handleClickEvent(event: MouseEvent){
    //if(this.show) {
    //  console.log("====> clicked body hide modal =====");
      //this.show = false;
    //}
  }

  ngAfterViewInit() {
    //this.header.createEmbeddedView(this.headerTemplate);
  }

  ngOnDestroy() : void {

  }

  destroy() : void {
  }
}
