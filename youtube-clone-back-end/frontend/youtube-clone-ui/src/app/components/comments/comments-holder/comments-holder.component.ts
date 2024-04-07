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
    let commentsCount = this.comments.length+1;
    let comment: Comment = {
      id: commentsCount, //ID will come from the db auto incrementing
      username: this.user.username,
      commentText: this.commentInput,
      imageUrl: this.user.profilePicture!,
      userId: this.user.id,
      likeCount: 0,
      dislikeCount: 0,
      createdAt: new Date(),
      lastUpdated: new Date(),
      replyCount: 0,
      subComments: [],
      videoId: this.videoId,
      parentCommentId: 0
    }
    this.commentInput = '';
    this.comments = [...this.comments, comment];
    //this.comments_copy = JSON.parse(JSON. stringify(this.comments))
  }

  onCommentUpdate(updatedComment: any, originalComment: Comment): void {

    console.log("comment updated", updatedComment);
    console.log("old comment", originalComment);

    //console.log("CLONE ", this.comments_copy)
    console.log("whole comment list before ", this.comments);

    // Find the index of the originalComment in the comments array
    const index = this.comments.indexOf(updatedComment)//(originalComment);
    console.log("index", index);
    
    const ogIndex = this.comments.indexOf(originalComment)
    console.log("ogIndex", ogIndex);
    
    // Update the comments array with the updatedComment at the found index
    const commentForm: CommentForm = {
      userId: this.user.id,
      videoId: this.videoId,
      commentText: updatedComment.commentText,//remove and replace 
      parentCommentId: updatedComment.id
    };
    
    this.commentService.create(commentForm).subscribe({
      next: (response: HttpResponseInterface<Comment>) => {
        if (index !== -1) {
          const comment: Comment = response.data.comment;
          const subComment: SubComment = {
            createdAt: comment.createdAt,
            lastUpdated: comment.lastUpdated,
            text: comment.commentText,
            to: updatedComment.username,
            username: comment.username,
            imageUrl: comment.imageUrl,
            parentId: comment.parentCommentId!,
            likeCount: comment.likeCount
          }; //response.comment;

          this.comments[index].subComments = [...this.comments[index].subComments, subComment];//updatedComment;
        }

        console.log("whole comment list after ", this.comments);
      }
    })
    

    
  }
}
