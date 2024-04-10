import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Icons } from '../../models/icons';
import { DatecstmPipe } from '../../pipes/datecstm/datecstm.pipe';
import { Video } from '../../shared/types/video';
import { StandardDropdownComponent } from '../dropdown/standard-dropdown/standard-dropdown.component';
import { PlaylistService } from '../../shared/services/playlist/playlist.service';
import { VideoItemFormInterface } from '../../shared/types/videoItemForm.interface';

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
        StandardDropdownComponent,
        DatecstmPipe
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

  @Input() playlistId: number;
  @Input() items: Video[] = [];
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

  constructor(private playlistService: PlaylistService) {
    
    if(this.dropDownItems.length == 0) {
      this.dropDownItems = [
        //{ icon: 'playlist_play', text: 'Add to queue', action: () => {} },
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

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  /**
   * Sort items and emit new list
   * @param event
   */
  drop(event: CdkDragDrop<Video[]>) {
    
    let updatedPosSlice = this.updatePositions(this.items, event.previousIndex, event.currentIndex);
    updatedPosSlice.forEach((item) => {
      for(let oldItem of  this.items) {
        if(oldItem.id === item.id) {
          oldItem.position = item.position;
          break;
        }
      }
    });
    
    //if(this.playlistId) {//update playlist only if a playlist id
    this.updatePlaylistItems(updatedPosSlice);
    //}
    
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);    
    this.onListUpdate.emit(this.items);
  }

  /**
   * update position of videos in playlist
   * @param { Video[] } list the list of loaded videos
   * @param { number } prevPos the previous position of the video that was moved 
   * @param { number } currPos the current position of the video that was moved 
   * @returns { Video[] } the list of videos slice with updated positions
   */
  updatePositions(list: Video[], prevPos: any, currPos: any): Video[] {
    // Assuming your array is stored in a variable called 'items'
    const index = list.findIndex(item => item.position === prevPos);
    //prevPos, index
    const slice = index !== -1 ? list.slice(currPos, prevPos + 1) : list; // Slice up to position 0 or whole array if position 0 is not found
    const target = slice.pop();//get last item

    // Insert the last item at the beginning of the array
    if (target) {
      slice.unshift(target);
    }
    // Update positions
    const currentPosition = currPos; // Set your desired currentPosition
    //slice.
    slice.forEach((item, idx) => {
      item.position = currentPosition + idx;
    });
    
    // Reorder the list based on position desc
    const reorderedItems = Array.from(slice).sort((a: Video, b: Video) => a.position! - b.position!);
    
    return reorderedItems;
  }


  /**
   * update server with new position for video in playlist
   * @param videosSlice the videos slice
   */
  updatePlaylistItems(videosSlice: Video[]) {
    let videoItemFormList: VideoItemFormInterface[] = [];

    for(let video of videosSlice) {
      const videoItem: VideoItemFormInterface = {
        videoId: video.id,
        playlistId: this.playlistId,
        videoPosition: video.position
      } 
      videoItemFormList = [...videoItemFormList, videoItem];
    };

    this.playlistService.updatePositions(videoItemFormList).subscribe({});
  }
}
