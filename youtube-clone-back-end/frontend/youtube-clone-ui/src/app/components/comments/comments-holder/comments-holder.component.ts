import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Comment } from '../../../models/comment';
import { selectCurrentUser } from '../../../shared/store/user/reducers';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { CommentComponent } from '../comment/comment.component';
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
  @Input() user: CurrentUserInterface;/*: any = {
    userId: 'timbaWolf',
    iconURL: '../../../assets/batman_red_glow.jpg'
  };*/
  commentInput: string;

  constructor(private store: Store) {}

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
      imageUrl: this.user.profilePicture,
      userId: this.user.id,
      likeCount: 0,
      dislikeCount: 0,
      postTime: '2 hours',
      replyCount: 0,   
      subComments: []
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
    // Update the comments array with the updatedComment at the found index
    if (index !== -1) {
      this.comments[index] = updatedComment;
    }

    console.log("whole comment list after ", this.comments);
  }

}
