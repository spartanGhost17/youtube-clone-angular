import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  @Input() imageURL: string = '../../../assets/batman_and_superman_detective_comics.jpg';
  @Input() username: string = 'dannychan4803';
  @Input() commentText: string = 'I’m upset Rey didn’t get to finish certain questions. I get the comedic aspect of the interview but let’s hear Rey’s answers more so than Kevin’s outburst.';
  @Input() postTime: string = '1 hour';
  @Input() replyCount: number = 64;
  @Input() comments: any[] = [];

  commentInput:string;
  like: boolean = false;
  dislike: boolean = false;
  showReply: boolean = false;
  showReplies: boolean = false;
  //fontVariationSettings: string = `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24`;
  FILL_ICON: string = `'FILL' 1, 'wght' 200, 'GRAD' 0, 'opsz' 24`;
  EMPTY_FILL_ICON: string = `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24`;
  likeCount: number = 10;


  constructor() {}

  ngOnInit(): void {
    this.comments = [
      {
        icon: '../../../assets/light-yagami.png',
        userId: 'louisBlaster',
        postTime: '10 minutes',
        text: `My brother, in Terminator 2. Wasn't the terminator more human than us??  👍 🔥`,
        to: 'AceTempo',
        likeCount: 30
      },
      {
        icon: '../../../assets/goku_god_mode.jpg',
        userId: 'MonsterHunter2099',
        postTime: '4 hours',
        text: `The best terminator day are way behind us dude`,
        to: 'taylorMacarrena267',
        likeCount: 12
      }
    ];
  }

  onLikeClicked() {
    if(this.dislike) {
      this.dislike = false;  
    }
    this.like = !this.like;
    this.likeCount += 1;
    //TODO: Make a call to the backend
  }

  onDislikeClicked(): void {
    if(this.like) {
      this.like = false;
    }
    this.dislike = !this.dislike;
    this.likeCount -= 1;
    //TODO: Make a call to the backend
  }

  onShowClicked() {
    this.showReply = true;
  }

  onCancelReply() {
    this.showReply = false;
  }

  onReply() {

  }

  onShowReplyClicked() {
    this.showReplies = !this.showReplies;
  }
}
