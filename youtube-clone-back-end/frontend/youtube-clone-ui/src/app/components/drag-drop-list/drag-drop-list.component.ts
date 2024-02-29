import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Icons } from '../../models/icons';
import { StandardDropdownComponent } from '../dropdown/standard-dropdown/standard-dropdown.component';

@Component({
    selector: 'app-drag-drop-list',
    templateUrl: './drag-drop-list.component.html',
    styleUrls: ['./drag-drop-list.component.scss'],
    standalone: true,
    imports: [
        CdkDropList,
        NgIf,
        NgFor,
        CdkDrag,
        CdkDragHandle,
        NgStyle,
        StandardDropdownComponent
    ],
})
export class DragDropListComponent {
  icons: Icons = new Icons();
  ICON_ELIPSIS: string = this.icons.iconsPaths['elipsis-light'];
  ICON_BURGER: string = this.icons.iconsPaths['burger-light'];
  currentPos: any;
  dropPos: any;
  leftIcon: string = 'menu';
  rightIcon: string = 'more_vert';

  @Input() items: any[] = [];
  @Input() showViews: boolean = true;
  @Input() isSmall: boolean = false;

  @ViewChildren('draggable') draggables: QueryList<ElementRef>;
  @ViewChild('draggableContainer') draggableContainer: ElementRef<any>;
  @ViewChild('list') list: ElementRef<any>;
  @ViewChild('listContainer') listContainer: ElementRef<any>;
  @Output() onListUpdate: EventEmitter<any[]> = new EventEmitter();

  currentDraggable: any;

  isDragging = false;
  listItem: any;
  moveItem: any;
  @Input() dropDownItems: any[] = [];

  constructor() {
    if(this.dropDownItems.length == 0) {
      this.dropDownItems = [
        { icon: 'playlist_play', text: 'Add to queue', action: () => {} },
        { icon: 'schedule', text: 'Save to Watch Later', action: () => {} },
        { icon: 'playlist_add', text: 'Save to playlist', action: () => {} },
        { icon: 'delete', text: 'Remove from', action: () => {} },
        { icon: 'download', text: 'Download', action: () => {} },
        { icon: 'share', text: 'Share', action: () => {} },
        { seperator: true },
        { icon: 'image', text: 'Set as playlist thumbnail', action: () => {} },
      ];
    } 
  }

  ngOnInit(): void {
    console.log('ngOnInit on parent!!!! ', this.dropDownItems);
  }

  ngAfterViewInit(): void {}

  /**
   * Sort items and emit new list
   * @param event
   */
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.onListUpdate.emit(this.items);
  }
}
