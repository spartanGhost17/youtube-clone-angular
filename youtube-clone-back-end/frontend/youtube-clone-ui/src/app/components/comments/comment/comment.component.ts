import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '../../../directives/tooltip/tooltip.directive';
import { Comment } from '../../../models/comment';
import { SubComment } from '../../../models/subComment';
import { ComponentUpdatesService } from '../../../shared/services/app-updates/component-updates.service';
import { UserInterface } from '../../../shared/types/user.interface';
import { StandardDropdownComponent } from '../../dropdown/standard-dropdown/standard-dropdown.component';
import { DatecstmPipe } from '../../../pipes/datecstm/datecstm.pipe';
import { CommentService } from '../../../shared/services/comment/comment.service';
import { CommentRequestForm } from '../../../shared/types/commentReqForm.interface';
import { ReportType } from '../../../models/enum/reportType.enum';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    standalone: true,
    imports: [NgIf, TooltipDirective, FormsModule, NgClass, NgFor, StandardDropdownComponent, DatecstmPipe]
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() commentList: Comment[];
  @Output() commentUpdate: EventEmitter<SubComment> = new EventEmitter<SubComment>;
  @Input() user: UserInterface;
  @Input() videoId: number;

  dropDownItems: any[];
  subCommDropDownItems: any[];
  
  showReplies: boolean = false;
  //fontVariationSettings: string = `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24`;
  FILL_ICON: string = `'FILL' 1, 'wght' 200, 'GRAD' 0, 'opsz' 24`;
  EMPTY_FILL_ICON: string = `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24`;
  //likeCount: number = 10;
  commentInput:string;


  constructor(private componentUpdatesService: ComponentUpdatesService, private commentService: CommentService) {}

  
  ngOnInit(): void {
    console.log("Initial state comment ", this.comment)
    this.loadActions();
  }

  /**
   * Load edit and delete actions if comment owned by user,
   * else load only report action. 
  */
  loadActions() {
    this.dropDownItems =  [
      {icon: 'edit', text: 'Edit', action: (id: any, childId: any) => this.edit(id, childId)},
      {icon: 'delete', text: 'Delete', action: (id: any, childId: any) => this.delete(id, childId)},
    ];

    this.subCommDropDownItems =  [
      {icon: 'flag', text: 'Report', action: (id: any, childId: any) => this.report(id, childId)},
    ];
  }

  report(id: any, childId: any): void {
    console.log('report id: ', id, ' childId: ',childId);
    this.componentUpdatesService.toggleReportModal(true, ReportType.COMMENT);
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
    
    const subcomment: SubComment = {
      id: 1,
      username: this.user.username,
      imageUrl: this.user.profilePicture!,
      userId: this.user.id,
      likeCount: 0,
      createdAt: new Date(),
      text: this.commentInput,
      to: parentPost.username,
      parentId: this.comment.id,
      toUserId: parentPost.userId,
      lastUpdated: new Date()
    }

    this.commentInput = '';
    this.onCancelReply(parentPost);
    console.log("type: ", commetType, " parent post ", parentPost);
    console.log("subcomment added ", subcomment);
    this.commentUpdate.emit(subcomment);
  }

  onShowReplyClicked() {
    this.showReplies = !this.showReplies;
    
    if(this.showReplies) {
      
      const commentReqForm: CommentRequestForm = {
        videoId: this.videoId,
        pageSize: 100,
        offset: 0,
        parentId: this.comment.id,
        isSubComment: true
      }

      this.commentService.get(commentReqForm).subscribe({
        next: (response) => {
          const subComment = response.data.comments.map((subComment: Comment) => {
            const sbc: SubComment = {
              id: subComment.id,
              username: subComment.username,
              imageUrl: subComment.imageUrl,
              createdAt: subComment.createdAt,
              lastUpdated: subComment.lastUpdated,
              text: subComment.commentText,
              to: subComment.to!,
              userId: subComment.userId,
              toUserId: subComment.toUserId,
              parentId: subComment.parentCommentId!,
              likeCount: subComment.likeCount,
            }
            return sbc;
          });
          this.comment.subComments = subComment;
        }
      });  
    }
  }
}
