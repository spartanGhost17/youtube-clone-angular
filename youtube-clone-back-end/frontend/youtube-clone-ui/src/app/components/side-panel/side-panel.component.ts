import { Component, Input, SimpleChanges } from '@angular/core';
import { Icons } from '../../models/icons';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ComponentUpdatesService } from 'src/app/services/app-updates/component-updates.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {
  @Input() collapse : boolean = false;

  MIN_WIDTH: string = '72px';
  MAX_WIDTH: string = '240px';

  icons: Icons = new Icons();

  ICON_HOME: string = '../'+this.icons.iconsPaths['home-light'];
  ICON_HISTORY: string = '../'+this.icons.iconsPaths['history-light']
  ICON_WATCH_LATER: string = '../'+this.icons.iconsPaths['clock-light'];
  ICON_LIKE: string = '../'+this.icons.iconsPaths['like-light'];
  ICON_LIBRARY: string = '../'+this.icons.iconsPaths['library-light'];
  ICON_LIBRARY_VIDEO: string = '../'+this.icons.iconsPaths['library-video-light'];
  ICON_SHORTS: string = '../'+this.icons.iconsPaths['shorts'];
  ICON_SUBSCRIPTION: string = '../'+this.icons.iconsPaths['subscription-light'];
  ICON_RADIO_SIGNAL: string = '../'+this.icons.iconsPaths['radio-signal'];

  ICON_USER: string = '../../../assets/goku.jpg';


  sections: any[];
  section1 = [
    {'isActive':true, text: 'Home', icon: this.ICON_HOME, navigateTo: 'explore'},
    {'isActive':false, text: 'Shorts', icon: this.ICON_SHORTS, navigateTo: ''},
    {'isActive':false, text: 'Subscriptions', icon: this.ICON_SUBSCRIPTION, navigateTo: 'playlist'}
  ];

  section2 = [
    {'isActive':false, text: 'Library', icon: this.ICON_LIBRARY_VIDEO, navigateTo: ''}, 
    {'isActive':false, text: 'History', icon: this.ICON_HISTORY, navigateTo: ''},
    {'isActive':false, text: 'Your videos', icon: this.ICON_LIBRARY, navigateTo: ''},
    {'isActive':false, text: 'Watch Later', icon: this.ICON_WATCH_LATER, navigateTo: ''},
    {'isActive':false, text: 'Liked Videos', icon: this.ICON_LIKE, navigateTo: ''},
  ]

  subcribed_channels = [
    {'isActive':false, text: 'One Piece', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: ''},
    {'isActive':false, text: 'DBZ Hollo', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: ''},
    {'isActive':false, text: 'Channel 3', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: ''},
    {'isActive':false, text: 'Channel4777777777777777777777777 7777777777777777777777777777777', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: ''},
    {'isActive':false, text: 'Channel 5', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: ''},
    {'isActive':false, text: 'Channel 6', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: ''},
    {'isActive':false, text: 'Channel 7', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: ''},
    {'isActive':false, text: 'Channel 8', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: ''},
    {'isActive':false, text: 'Channel 9', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: ''},
    {'isActive':false, text: 'Channel 10', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: ''},
    {'isActive':false, text: 'Channel4 about ben solo  777777777777777777777777 7777777777777777777777777777777', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: ''},
    {'isActive':false, text: 'Cartoon Network kids', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: ''},
    {'isActive':false, text: 'Double Champ ent.', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: ''},
    {'isActive':false, text: 'WWE', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: ''},

  ]
  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
    private componentUpdatesService :ComponentUpdatesService) {
  }

  /**
   * Lifecycle hook
   */
  ngOnInit() {
    this.sections = [this.section1, this.section2, this.subcribed_channels];
  }

  ngAfterViewInit() {
    this.componentUpdatesService.sideBarWidthUpdate(this.MAX_WIDTH);
  }

  /**
   * Lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    if(changes.collapse.currentValue) {
      console.log('collapse => ', changes.collapse.currentValue);
      this.componentUpdatesService.sideBarWidthUpdate(this.MIN_WIDTH);//broadcast width of side panel
    }
    else if(!changes.collapse.currentValue) {
      console.log('false =>  ', changes.collapse.currentValue);
      this.componentUpdatesService.sideBarWidthUpdate(this.MAX_WIDTH);
    }
  }

  /**
   * change button status to active
   * @param button 
   */
  makeButtonActive(button: any) {
    console.log(this.section1.indexOf(button));
    for(const section of this.sections) {

      this.activeButtonHelper(button, section);
    }
  }

  /**
   * set all buttons to innactive except for the one that has been clicked
   * @param button 
   * @param section1 
   */
  activeButtonHelper(button : any, section: any[]) {
    for(let i = 0; i < section.length; i++) {
      if(section.includes(button)) {
        if(i === section.indexOf(button)){
          section[i].isActive = true;
          console.log("navigate to upload-video");
          this.router.navigate([section[i].navigateTo],{relativeTo:this.activatedRoute});
        }
        else {
          section[i].isActive = false;
        }
      }
      else {
        section[i].isActive = false;
      }
    }
  }
}
