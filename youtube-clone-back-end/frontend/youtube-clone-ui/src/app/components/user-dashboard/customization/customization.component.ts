import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SnackbarService } from '../../../services/snack-bar-messages/snackbar.service';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss']
})
export class CustomizationComponent { //TODO: add material ripple effect
  tabs: string[] = [];
  selectedTab: number = 0;
  indicatorPosition: string = '0px';
  brandingItems: any[] = [];
  channelUrl: string = 'https://www.youtube.com/channel/weweoajwpregjwerp';
  isUsernameUnique: boolean = true;
  FILL_ICON: string = `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24`;
  @ViewChild("indicator") indicator: ElementRef<any>;
  @ViewChildren("tab") tabsItems: QueryList<ElementRef>;


  constructor(private snackBarMessageService: SnackbarService) {}

  ngOnInit() {
    this.tabs = ['Layout', 'Branding', 'Basic info'];
    this.brandingItems = [
      { title: 'Picture', 
        titleDescription: 'Your profile picture will appear where your channel is presented on YouTube, such as next to your videos and comments',
        imageUrl: `../../../../assets/courage.png`,
        imageDescription: `It's recommended that you use a picture that's at least 98 x 98 pixels and 4 MB or less. Use a PNG or GIF (no animations) file. Make sure that your picture follows the YouTube Community Guidelines.`,
        isUserIcon: true
      },
      { title: 'Banner image', 
        titleDescription: 'This image will appear across the top of your channel',
        imageUrl: `../../../../assets/computer.svg`,
        imageDescription: `For the best results on all devices, use an image that's at least 2048 x 1152 pixels and 6 MB or less.`
      },
    ];
  }

  ngAfterViewInit() {
    this.selectTab(2);
  }

  /**
   * activate selected tab indicator
   * @param activeIndex 
   */
  selectTab(activeIndex: number) {
    this.selectedTab = activeIndex;
    let currentLeft = 0;
    let width = 0;
    this.tabsItems.forEach((tab, index) => {
      if(index === activeIndex) {
        currentLeft = tab.nativeElement.getBoundingClientRect().left;
        width = tab.nativeElement.getBoundingClientRect().width;
        return;
      }
    });
    const offset = currentLeft - this.tabsItems.get(0)?.nativeElement.getBoundingClientRect().left;
    this.indicator.nativeElement.style.width = `${width}px`;
    this.indicator.nativeElement.style.transform = `translateX(${offset}px)`;
  }

  onCopyToClipboard() {
    navigator.clipboard.writeText(this.channelUrl);
    this.snackBarMessageService.openSnackBar("Copied link to clipboard");     
  }

  onChangeUserIcon(){

  } 
  
  onRemoveUserIcon() {

  } 
  
  onUploadUserIcon() {

  }

  onViewChannel() {

  }

  onCancel() {

  }

  onPublish() {

  }

}
