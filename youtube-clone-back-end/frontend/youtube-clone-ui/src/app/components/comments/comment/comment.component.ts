import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubComment } from '../../../models/subComment';
import { Comment } from '../../../models/comment'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() commentList: Comment[];
  @Output() commentUpdate: EventEmitter<Comment> = new EventEmitter<Comment>;
  @Input() user: any;//: any = {
  //  username: 'timbaWolf',
  //  iconURL: '../../../assets/batman_red_glow.jpg'
  //};

  dropDownItems: any[];
  
  /*@Input() imageURL: string = '../../../assets/batman_and_superman_detective_comics.jpg';
  @Input() username: string = 'dannychan4803';
  @Input() commentText: string = 'I’m upset Rey didn’t get to finish certain questions. I get the comedic aspect of the interview but let’s hear Rey’s answers more so than Kevin’s outburst.';
  @Input() postTime: string = '1 hour';
  @Input() replyCount: number = 64;
  @Input() subComments: SubComment[] = [];

  
  like: boolean = false;
  dislike: boolean = false;
  showReply: boolean = false;*/
  showReplies: boolean = false;
  //fontVariationSettings: string = `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24`;
  FILL_ICON: string = `'FILL' 1, 'wght' 200, 'GRAD' 0, 'opsz' 24`;
  EMPTY_FILL_ICON: string = `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24`;
  //likeCount: number = 10;
  commentInput:string;


  constructor() {}

  
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
        {icon: 'report', text: 'Report', action: (id: any, childId: any) => this.report(id, childId)},
      ];
    }
  }

  report(id: any, childId: any): void {
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