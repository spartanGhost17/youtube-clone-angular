import { Component, ElementRef, HostListener, Input, Output, QueryList, Renderer2, ViewChild, ViewChildren, EventEmitter, ViewEncapsulation } from '@angular/core';

import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgFor} from '@angular/common';

import { Icons } from '../../models/icons';

@Component({
  selector: 'app-drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.scss'],
})
export class DragDropListComponent {
  icons: Icons = new Icons();
  ICON_ELIPSIS: string = this.icons.iconsPaths['elipsis-light'];
  ICON_BURGER: string = this.icons.iconsPaths['burger-light'];
  currentPos: any;
  dropPos: any;
  leftIcon: string = 'menu'
  rightIcon: string = 'more_vert';

  @Input() items: any[] = [];

  @ViewChildren('draggable') draggables: QueryList<ElementRef>;
  @ViewChild('draggableContainer') draggableContainer: ElementRef<any>;
  @ViewChild('list') list: ElementRef<any>;
  @ViewChild('listContainer') listContainer: ElementRef<any>;
  @Output() onListUpdate: EventEmitter<any[]> = new EventEmitter();

  

  currentDraggable: any;

  isDragging = false;
  listItem: any;
  moveItem: any;
  dropDownItems: any[];

  constructor() {
    this.dropDownItems =  [
      {icon: 'playlist_play', text: 'Add to queue', function: ''},
      {icon: 'schedule', text: 'Save to Watch Later', function: ''},
      {icon: 'playlist_add', text: 'Save to playlist', function: ''},
      {icon: 'delete', text: 'Remove from', function: ''},
      {icon: 'download', text: 'Download', function: ''},
      {icon: 'share', text: 'Share', function: ''},
      {seperator: true},
      {icon: 'image', text: 'Set as playlist thumbnail'}
    ]
  }

  ngOnInit(): void {
    console.log('ngOnInit on parent!!!! ', this.dropDownItems)
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