import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-standard-dropdown',
    templateUrl: './standard-dropdown.component.html',
    styleUrls: ['./standard-dropdown.component.scss'],
    standalone: true,
    imports: [NgIf, NgClass, NgStyle, NgTemplateOutlet, NgFor]
})
export class StandardDropdownComponent {
  @Input() items: any[] = [];
  @Input() circle: boolean = false;
  //@Input() regular: boolean = true;
  @Input() buttonText: string;
  @Input() iconRight: string;
  @Input() iconLeft: string;
  @Input() minWidth: string;
  @Input() parentId: number;
  @Input() childId: number;
  @Input() imageSrc: string;
  @Input() icon: string;
  @Input() fillIcon: boolean;
  //if header is present
  @Input() isHeader: boolean = false; 
  @Input() headerTemplate: TemplateRef<any>;
  @Output() menuUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Output() subMenuUpdated: EventEmitter<any> = new EventEmitter<any>();

  FILL_ICON: string = `'FILL' 1, 'wght' 200, 'GRAD' 0, 'opsz' 48`;
  EMPTY_FILL_ICON: string = `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48`;

  toggleDropdown: boolean = false;
  toggleSubMenuDropdown: boolean = true;

  @ViewChild('dropdown') dropdown: ElementRef<any>;
  showSubMenu: boolean;
  currentMenu: any;


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
  }

  showDropdown(): void {
    this.toggleDropdown = !this.toggleDropdown;
  }

  onShowSubMenu(item: any): void {
    this.currentMenu = item;//.subMenu;
    this.toggleSubMenuDropdown = true; //show submenu
    if(item.subMenu) {
      this.showSubMenu = true;
    }
  }

  onChangeSubMenuSelection(selectedItem: any): void {
    this.showSubMenu = false;
    this.toggleSubMenuDropdown = false; //show submenu
    
    this.updateSubMenu(selectedItem);

    this.updateMenu();

    this.subMenuUpdated.emit(this.currentMenu);
    this.showDropdown();
  }


  updateSubMenu(selectedItem: any): void {
    this.currentMenu.subMenu.forEach((item: any, idx: any) => {
      item.isSelected = false;
      
      if(selectedItem === item) {
        item.isSelected = true;
      }
      else {
      }
    });

  }

  updateMenu(): void {
    this.items.forEach((menu, idx) => {
      if(menu.text === this.currentMenu.text) {
        menu = this.currentMenu;
      }
    });
  }

  onCloseSubMenu(): void {
    this.showSubMenu = false;
    this.subMenuUpdated.emit(this.currentMenu);
  }
}
