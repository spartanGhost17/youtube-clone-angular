import { Component, Directive, ElementRef, Input, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

@Directive({
  selector: '[header]'
})
export class Header {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {
  @Input() showDropdown: boolean;
  @Input() header: TemplateRef<any>;
  @Input() body: TemplateRef<any>;
  @Input() footer: TemplateRef<any>;
  @Input() dropdownWidth: string = '400px';
  @Input() buttonRef: ElementRef<any>//<HTMLButtonElement>;
  left: string;
  top: string;
  @ViewChild('drop') drop: ElementRef<any>;

  ngOnInit(): void {}

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.showDropdown) {
      if(this.buttonRef){
        this.test();
        //this.top = this.buttonRef.nativeElement.getBoundingClientRect().top;
        //this.left = this.buttonRef.nativeElement.getBoundingClientRect().left+'px';
        this.top = this.buttonRef.nativeElement.offsetTop;
        this.left = this.buttonRef.nativeElement.offsetRight;
        console.log(this.buttonRef.nativeElement.getBoundingClientRect().top);
        console.log(this.buttonRef.nativeElement.getBoundingClientRect().left);
        if(this.showDropdown){
          console.log(` dropdown values: top ${this.drop.nativeElement.getBoundingClient().top} left: ${this.drop.nativeElement.getBoundingClient().left} `)
        }
      }
      
      console.log("show ---->",changes.showDropdown.currentValue)
    }
  }

  /*toggleDropDown(){
    this.isVisible = !this.isVisible;
  }*/

  test() {
    const buttonPosition = this.buttonRef.nativeElement.getBoundingClientRect();
    console.log(buttonPosition);
    console.log(this.buttonRef.nativeElement.offsetTop + this.buttonRef.nativeElement.offsetHeight + 'px');
    console.log(this.buttonRef.nativeElement.offsetLeft + 'px');
    console.log("=============================================================================================");
  }
}
