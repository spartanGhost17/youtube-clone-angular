import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment';
import { CommentComponent } from '../comment/comment.component';
import { NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-comments-holder',
    templateUrl: './comments-holder.component.html',
    styleUrls: ['./comments-holder.component.scss'],
    standalone: true,
    imports: [FormsModule, NgFor, CommentComponent, NgStyle]
})
export class CommentsHolderComponent implements OnInit {
  @Input() comments: Comment[];
  //comments_copy: Comment[];
  @Input() user: any = {
    userId: 'timbaWolf',
    iconURL: '../../../assets/batman_red_glow.jpg'
  };
  commentInput: string;

  constructor() {}

  ngOnInit(): void {}

  onCancelReply(): void {
    this.commentInput = '';
  }

  onReply(): void {
    let commentsCount = this.comments.length+1;
    let comment: Comment = {
      id: commentsCount.toString(), //ID will come from the db auto incrementing
      commentText: this.commentInput,
      imageURL: this.user.iconURL,
      userId: this.user.userId,
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
