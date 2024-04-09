import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Comment } from '../../../models/comment';
import { selectCurrentUser } from '../../../shared/store/user/reducers';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { CommentComponent } from '../comment/comment.component';
import { CommentService } from '../../../shared/services/comment/comment.service';
import { CommentRequestForm } from '../../../shared/types/commentReqForm.interface';
import { CommentForm } from '../../../shared/types/commentForm.interface';
import { SubComment } from '../../../models/subComment';
import { HttpResponseInterface } from '../../../shared/types/httpResponse.interface';
@Component({
    selector: 'app-comments-holder',
    templateUrl: './comments-holder.component.html',
    styleUrls: ['./comments-holder.component.scss'],
    standalone: true,
    imports: [FormsModule, NgFor, CommentComponent, NgStyle, NgIf, NgClass]
})
export class CommentsHolderComponent implements OnInit {
  loading: boolean;
  @Input() comments: Comment[];
  @Input() user: CurrentUserInterface;
  @Input() videoId: number;
  commentInput: string;

  constructor(private store: Store, private commentService: CommentService) {}

  ngOnInit(): void {
    this.loading = true;
    this.store.select(selectCurrentUser).subscribe({
      next: (data) => {
        this.user = data!;
        this.loading = false;
      }
    });
  }

  onCancelReply(): void {
    this.commentInput = '';
  }

  onReply(): void {
    const commentForm: CommentForm = {
      userId: this.user.id,
      videoId: this.videoId,
      //toUserId: updatedComment.toUserId,
      commentText: this.commentInput,
      //parentCommentId: updatedComment.parentId
    };

    this.commentService.create(commentForm).subscribe({
      next: (response) => {
        const comment: Comment = response.data.comment;
        this.comments = [...this.comments, comment];
      }
    });

    this.commentInput = '';
    //this.comments_copy = JSON.parse(JSON. stringify(this.comments))
  }

  onSubCommentUpdate(updatedComment: SubComment): void {

    const comm = this.comments.filter(c => c.id === updatedComment.parentId)[0];
    const index = this.comments.indexOf(comm);

    // Update the comments array with the updatedComment at the found index
    const commentForm: CommentForm = {
      userId: this.user.id,
      videoId: this.videoId,
      toUserId: updatedComment.toUserId,
      commentText: updatedComment.text,//remove and replace 
      parentCommentId: updatedComment.parentId
    };
    
    this.commentService.create(commentForm).subscribe({
      next: (response: HttpResponseInterface<Comment>) => {
        if (index !== -1) {
          const comment: Comment = response.data.comment;
          const subComment: SubComment = {
            createdAt: comment.createdAt,
            lastUpdated: comment.lastUpdated,
            text: comment.commentText,
            to: comment.to!,//updatedComment.username!,
            toUserId: comment.toUserId,
            username: comment.username,
            imageUrl: comment.imageUrl,
            parentId: comment.parentCommentId!,
            likeCount: comment.likeCount
          };
          this.comments[index].subComments = [...this.comments[index].subComments, subComment];//updatedComment;
          this.comments[index].replyCount += 1;
        }
      }
    });
  }
}
