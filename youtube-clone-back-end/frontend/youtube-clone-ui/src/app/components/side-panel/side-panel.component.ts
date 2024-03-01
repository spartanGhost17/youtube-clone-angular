import { Component, Input, SimpleChanges } from '@angular/core';
import { Icons } from '../../models/icons';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ComponentUpdatesService } from 'src/app/shared/services/app-updates/component-updates.service';
import { NgIf, NgStyle, NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'app-side-panel',
    templateUrl: './side-panel.component.html',
    styleUrls: ['./side-panel.component.scss'],
    standalone: true,
    imports: [NgIf, NgStyle, NgFor, NgClass]
})
export class SidePanelComponent {
  @Input() collapse : boolean = false;
  hoverPanel : boolean = false;

  MIN_WIDTH: string = '72px';
  MAX_WIDTH: string = '240px';
  @Input() sections: any[];
  @Input() user: any;

  //@Input() userIconURL:string = '../../../assets/justice_league.jpg'
  /*icons: Icons = new Icons();

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

  @Input() sections: any[];
  section1: any[];
  section2: any[];
  subcribed_channels: any[];*/

  FILL_ICON: string = `'FILL' 1, 'wght' 200, 'GRAD' 0, 'opsz' 24`;
  EMPTY_FILL_ICON: string = `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24`;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
    private componentUpdatesService :ComponentUpdatesService) {
  }
  /**
   * Lifecycle hook
   */
  ngOnInit() {
    console.log("INITIALIZING DRAWER...")

    this.componentUpdatesService.sideBarType$.subscribe((sidebarType) => {
      if (sidebarType === 'side') {
        this.hoverPanel = false;
      }
      else {
        this.hoverPanel = true;
      }
    });

    this.componentUpdatesService.sideBarCollapsed$.subscribe((collapsed) => {
      this.collapse = collapsed;
    });
  }

  ngAfterViewInit() {
    this.componentUpdatesService.sideBarWidthUpdate(this.MAX_WIDTH);
  }

  /**
   * Lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    if(!this.hoverPanel) {
      if(changes.collapse.currentValue) {
        console.log('collapse => ', changes.collapse.currentValue);
        this.componentUpdatesService.sideBarWidthUpdate(this.MIN_WIDTH);//broadcast width of side panel
      }
      else if(!changes.collapse.currentValue) {
        console.log('false =>  ', changes.collapse.currentValue);
        this.componentUpdatesService.sideBarWidthUpdate(this.MAX_WIDTH);
      }
    }
  }

  /**
   * change button status to active
   * @param button 
   */
  makeButtonActive(button: any) {
    //console.log(this.section1.indexOf(button));
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
          section[i].type = 'fill';

          console.log("Active button \n\n\n");
          console.log(section[i]);
          

          console.log("navigate to upload-video");
          this.componentUpdatesService.sideBarTypeUpdate(section[i].sidebarType);
          
          let params = {};
          //add params
          if(section[i].playlistName) {
            params = {
              relativeTo:this.activatedRoute,
              queryParams: { list: section[i].playlistName }, // Replace 'yourListValueHere' with the actual value
              queryParamsHandling: 'merge' // This ensures that existing query parameters are preserved
            }
          }
          else {
            params = {
              relativeTo:this.activatedRoute
            }
          }
          
          if(!section[i].newTab) {
            if(section[i].isChannel) {
              this.router.navigate([`${section[i].navigateTo}${section[i].text}`]);
            }
            else {
              console.log("navigate to ", section[i].navigateTo)
              if(Object.keys(params).length > 0) {
                this.router.navigate([section[i].navigateTo], params);
              }
              else {
                this.router.navigate([section[i].navigateTo]);
              }
              
            }
          }
          else {
            //TODO: figure out how to perist user ngrx session
            //this.router.navigate([section[i].navigateTo]);
            this.router.navigate([section[i].navigateTo]);
            // Open the link in a new tab
            //window.open(`${section[i].navigateTo}`, '_blank');
          }
        }
        else {
          section[i].isActive = false;
          section[i].type = 'outlined';
        }
      }
      else {
        section[i].isActive = false;
        section[i].type = 'outlined';
      }
    }
  }
}
