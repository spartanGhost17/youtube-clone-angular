import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubComment } from '../../../models/subComment';
import { Comment } from '../../../models/comment'
import { StandardDropdownComponent } from '../../dropdown/standard-dropdown/standard-dropdown.component';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '../../../directives/tooltip/tooltip.directive';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { ComponentUpdatesService } from '../../../shared/services/app-updates/component-updates.service';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    standalone: true,
    imports: [NgIf, TooltipDirective, FormsModule, NgClass, NgFor, StandardDropdownComponent]
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() commentList: Comment[];
  @Output() commentUpdate: EventEmitter<Comment> = new EventEmitter<Comment>;
  @Input() user: any;

  dropDownItems: any[];
  
  showReplies: boolean = false;
  //fontVariationSettings: string = `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24`;
  FILL_ICON: string = `'FILL' 1, 'wght' 200, 'GRAD' 0, 'opsz' 24`;
  EMPTY_FILL_ICON: string = `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24`;
  //likeCount: number = 10;
  commentInput:string;


  constructor(private componentUpdatesService: ComponentUpdatesService) {}

  
  ngOnInit(): void {
    this.loadActions();
  }

  /**
   * Load edit and delete actions if comment owned by user,
   * else load only report action. 
  */
  loadActions(): void {
    if(this.user.userId === this.comment.userId) { //if user is comment owner
      this.dropDownItems =  [
        {icon: 'edit', text: 'Edit', action: (id: any, childId: any) => this.edit(id, childId)},
        {icon: 'delete', text: 'Delete', action: (id: any, childId: any) => this.delete(id, childId)},
      ];
    }
    else {
      this.dropDownItems =  [
        {icon: 'flag', text: 'Report', action: (id: any, childId: any) => this.report(id, childId)},
      ];
    }
  }

  report(id: any, childId: any): void {
    this.componentUpdatesService.toggleReportModal(true);
    if(childId) {
      console.log('REPORT This is a subComment = ', childId, ' parent id ', id);
      //TODO: call backend
    }
    else {
      console.log('REPORT This is a parent comment = ', id);
      //TODO: call backend
    }
  }

  edit(id: any, childId: any): void {
    if(childId) {
      console.log('EDIT This is a subComment = ', childId, ' parent id ', id);

    }
    else {
      console.log('EDIT This is a parent comment = ', id);
      //this.comment.showReply = true;
    }
  }

  delete(id: any, childId: any): void {
    if(childId) {
      console.log('DELETE This is a subComment = ', childId, ' parent id ', id);
      const subComment: SubComment[] = this.comment.subComments!.filter(x => x.id === childId);
      const idx: number = this.comment.subComments!.indexOf(subComment[0]);

      if(subComment!.length>0) {
        this.comment.subComments?.splice(idx, 1);
      }
    }
    else {
      console.log('DELETE This is a parent comment = ', id);
      const idx = this.commentList.indexOf(this.comment);
      this.commentList.splice(idx, 1);
    }
  }

  onLikeClicked(comment: any) {
    console.log(` comment \n comment `, comment)
    comment.like = !comment.like;
    if(comment.dislike) {
      comment.dislike = false;
    }
    
    if(comment.like) {
      comment.likeCount += 1;
    }
    else {
      comment.likeCount -= 1;
    }
    console.log(this.comment)
    //TODO: Make a call to the backend
  }

  onDislikeClicked(comment: any): void {
    console.log(` comment \n ${comment}`)
    comment.dislike = !comment.dislike;
    if(comment.like) {
      comment.like = false;
    }
    
    
    if(comment.dislike) {
      if(comment.likeCount > 0) {
        comment.likeCount -= 1;
      }
    }
    else {
      if(comment.likeCount > 0) {
        comment.likeCount += 1;
      }
    }
    //TODO: Make a call to the backend
  }

  onShowClicked(comment: any) {
    comment.showReply = true;
  }

  onCancelReply(comment: any) {
    comment.showReply = false;
  }

  onReply(commetType: string, parentPost: any) {
    
    //if(commetType === 'subComment') {
    const subcomment: SubComment = {
      id: '1',
      iconURL: this.user.iconURL,
      userId: this.user.userId,
      likeCount: 0,
      postTime: '1',
      text: this.commentInput,
      to: parentPost.userId,
    }

    this.commentInput = '';
    this.onCancelReply(parentPost);
    this.comment.subComments?.push(subcomment);
    this.commentUpdate.emit(this.comment);

    console.log("subcomment added ", subcomment);
  }

  onShowReplyClicked() {
    this.showReplies = !this.showReplies;
  }
}
