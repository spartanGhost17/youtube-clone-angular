import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-standard-dropdown',
  templateUrl: './standard-dropdown.component.html',
  styleUrls: ['./standard-dropdown.component.scss']
})
export class StandardDropdownComponent {
  @Input() items: any[] = [];
  @Input() circle: boolean = false;
  //@Input() regular: boolean = true;
  @Input() buttonText: string;
  @Input() iconRight: string;
  @Input() iconLeft: string;
  @Input() minWidth: string;
  @Input() parentId: string;
  @Input() childId: string;
  @Input() icon: string = 'more_vert'; 

  toggleDropdown: boolean = false;

  @ViewChild('dropdown') dropdown: ElementRef<any>;


  // HostListener to detect clicks anywhere in the document
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const clickedInside = this.dropdown.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.toggleDropdown = false;
    }
  }


  constructor() {}

  ngOnInit(): void {
    console.log('Initializing ', this.items)
  }

  showDropdown(): void {
    this.toggleDropdown = !this.toggleDropdown;
  }
}
