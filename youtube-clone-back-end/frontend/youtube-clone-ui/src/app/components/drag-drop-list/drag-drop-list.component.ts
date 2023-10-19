import { Component, ElementRef, HostListener, Input, Output, QueryList, Renderer2, ViewChild, ViewChildren, EventEmitter } from '@angular/core';
import { Icons } from '../../models/icons';

@Component({
  selector: 'app-drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.scss']
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

  constructor(private renderer: Renderer2) {
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

  ngAfterViewInit(): void {
    //this.onDragEvent();
    //this.onDragOverContainerEvent();
  }

  //onDragEvent() {
    /*this.draggables.forEach((elementRef: ElementRef) => {
      const draggable = elementRef.nativeElement;
      // Add event listeners
      this.renderer.listen(draggable, 'dragstart', (event: MouseEvent) => {

        this.currentPos = draggable.getAttribute('data-index');

        setTimeout(() => {
          draggable.style.display = 'none';
        }, 0);
        console.log('dragStart OVER ?? ', draggable);
      });

      this.renderer.listen(draggable, 'dragover', (event: MouseEvent) => {
        event.preventDefault();
      });

      this.renderer.listen(draggable, 'drop', (event: MouseEvent) => {
        event.preventDefault();
        this.dropPos = draggable.getAttribute('data-index');
        
        this.items.splice(this.dropPos, 0, this.items.splice(this.currentPos, 1)[0]);
        this.onListUpdate.emit(this.items);//emit updated list
        
        console.log(`currentPos: ${this.currentPos} dropPos: ${this.dropPos}`)
      });

      this.renderer.listen(draggable, 'dragenter', (event: MouseEvent) => {
        draggable.classList.add('active');
      });

      this.renderer.listen(draggable, 'dragleave', (event: MouseEvent) => {
        draggable.classList.remove('active');
        console.log('dragLeave');
      });*/

      /*this.renderer.listen(draggable, 'dragend', (event: MouseEvent) => {
        draggable.style.display = 'flex';

        this.draggables.forEach((elementRef: ElementRef) => {
          const active = elementRef.nativeElement;
          active.classList.remove('active');
        });

        console.log('dragEnd');
      });*/
      
    //});

    onDragEvent() {
        this.draggables.forEach((elementRef: ElementRef) => {
          const draggable = elementRef.nativeElement;
          // Add event listeners
          this.renderer.listen(draggable, 'dragstart', (event: MouseEvent) => {
    
            this.currentPos = draggable.getAttribute('data-index');
    
            setTimeout(() => {
              draggable.style.display = 'none';
            }, 0);
          });
    
          this.renderer.listen(draggable, 'dragover', (event: MouseEvent) => {
            event.preventDefault();
          });
    
          this.renderer.listen(draggable, 'drop', (event: MouseEvent) => {
            event.preventDefault();
            this.dropPos = draggable.getAttribute('data-index');
    
          this.renderer.listen(draggable, 'dragenter', (event: MouseEvent) => {
          });
    
          this.renderer.listen(draggable, 'dragleave', (event: MouseEvent) => {
            console.log('dragLeave');
            this.dragLeave(event);
          });
        });
      });

    //startDragging(event: MouseEvent, index: number) {
    }



    dragStart(event: MouseEvent) {

    }

    dragOver(event: MouseEvent) {

    }

    dragDrop(event: MouseEvent) {

    }

    dragEnter(event: MouseEvent) {

    }

    dragLeave(event: MouseEvent) {

    }

    onMousedownEvent($event: any) : void {

    } 
}