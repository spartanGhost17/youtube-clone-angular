import {
  CommonModule,
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
  NgTemplateOutlet,
} from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SnackbarService } from '../../../shared/services/snack-bar-messages/snackbar.service';
import { userActions } from '../../../shared/store/user/actions';
import { selectCurrentUser } from '../../../shared/store/user/reducers';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { CurrentUserStateInterface } from '../../../shared/types/state/currentUserState.interface';
import { UpdateUserForm } from '../../../shared/types/updateUserForm.interface';
import { getFormData } from '../../../shared/utils/sharedUtils';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgTemplateOutlet,
    NgStyle,
    NgClass,
    CommonModule,
    FormsModule,
  ],
})
export class CustomizationComponent {
  //TODO: add material ripple effect
  tabs: string[] = [];
  selectedTab: number = 0;
  indicatorPosition: string = '0px';
  brandingItems: any[] = [];
  channelUrl: string = 'https://www.youtube.com/channel/weweoajwpregjwerp';
  isUsernameUnique: boolean = true;
  FILL_ICON: string = `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24`;
  isUplaodReady: boolean = false;
  isMetaUploadReady: boolean = false;
  selectedFile: File | null;
  userProfileImage: string;

  channelName: string;
  handle: string;
  description: string;
  updateUserForm: UpdateUserForm;
  currentUser: CurrentUserInterface;

  @ViewChild('indicator') indicator: ElementRef<any>;
  @ViewChildren('tab') tabsItems: QueryList<ElementRef>;

  constructor(
    private snackBarMessageService: SnackbarService,
    private store: Store<{ user: CurrentUserStateInterface }>
  ) {}

  ngOnInit() {
    this.updateUserForm = {
      username: '',
      channelName: '',
      phone: '',
      description: '',
      usingMfa: false,
      profilePicture: '',
    };

    this.tabs = ['Layout', 'Branding', 'Basic info'];
  }

  ngAfterViewInit() {
    this.store.select(selectCurrentUser).subscribe({
      next: (current) => {

        this.userProfileImage = current?.profilePicture!;
        if (current) {
          this.currentUser = current;

          this.channelName = current.channelName;
          this.description = current.description!;
          this.handle = current.username;

          this.updateUserForm = {
            username: current.username,
            channelName: current.channelName,
            phone: current.phone!,
            description: current.description!,
            usingMfa: current.usingMfa!,
            profilePicture: current.profilePicture!,
          };
        }

        this.createBrandingItems();
      },
    });
    this.selectTab(0);
  }

  createBrandingItems() {
    this.brandingItems = [
      {
        title: 'Picture',
        titleDescription:
          'Your profile picture will appear where your channel is presented on YouTube, such as next to your videos and comments',
        imageUrl: this.userProfileImage,
        imageDescription: `It's recommended that you use a picture that's at least 98 x 98 pixels and 4 MB or less. Use a PNG or GIF (no animations) file. Make sure that your picture follows the YouTube Community Guidelines.`,
        isUserIcon: true,
      },
      {
        title: 'Banner image',
        titleDescription:
          'This image will appear across the top of your channel',
        imageUrl: `../../../../assets/computer.svg`,
        imageDescription: `For the best results on all devices, use an image that's at least 2048 x 1152 pixels and 6 MB or less.`,
      },
    ];
  }

  /**
   * can update the user's metadata 
  */
  canUpdateUserMetadata() {
    if (
      this.updateUserForm.channelName !== this.currentUser.channelName.trim() ||
      this.updateUserForm.description !== this.currentUser.description ||
      this.updateUserForm.username !== this.currentUser.username.trim()
    ) {
      this.isMetaUploadReady = true;
      //console.log('CAN UPLOAD METADATA', this.isMetaUploadReady);
    } else {
      this.isMetaUploadReady = false;
      //console.log('CAN UPLOAD METADATA', this.isMetaUploadReady);
    }
  }

  onChannelNameChange(event: any) {
    this.updateUserForm.channelName = event || this.currentUser.channelName;
    this.canUpdateUserMetadata();
  }

  onHandleChange(event: any) {
    this.updateUserForm.username = event || this.currentUser.username;
    this.canUpdateUserMetadata();
  }

  onDescriptionChange(event: any) {
    this.updateUserForm.description = event === '' ? null : event;
    this.canUpdateUserMetadata();
  }

  /**
   * update the user information
   */
  updateUserMetadata() {
    console.log('update user metadata ', this.updateUserForm);
    this.store.dispatch(userActions.update({ request: this.updateUserForm }));
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
      if (index === activeIndex) {
        currentLeft = tab.nativeElement.getBoundingClientRect().left;
        width = tab.nativeElement.getBoundingClientRect().width;
        return;
      }
    });
    const offset =
      currentLeft -
      this.tabsItems.get(0)?.nativeElement.getBoundingClientRect().left;
    this.indicator.nativeElement.style.width = `${width}px`;
    this.indicator.nativeElement.style.transform = `translateX(${offset}px)`;
  }

  onCopyToClipboard() {
    navigator.clipboard.writeText(this.channelUrl);
    this.snackBarMessageService.openSnackBar('Copied link to clipboard');
  }

  /**
   * change user icon
   */
  onChangeUserIcon() {
    //this.isUplaodReady = !this.isUplaodReady;
  }

  onRemoveUserIcon() {}

  onUploadUserIcon() {}

  onViewChannel() {}

  onCancel() {
    this.isUplaodReady = false;
    this.isMetaUploadReady = false;
    this.selectedFile = null;
  }
  /**
   * uplaod any new updates
   */
  onPublish() {
    if (this.isUplaodReady) {
      //!.name) {
      console.log(this.selectedFile);
      const formData: FormData = getFormData(this.selectedFile!, 'image');
      this.store.dispatch(
        userActions.updateProfilePicture({ request: formData })
      );
    }

    if (this.isMetaUploadReady) {
      this.updateUserMetadata();
    }

    this.isMetaUploadReady = false;
    this.isUplaodReady = false;
  }

  /**
   * handle selected image
   * @param event
   */
  selectProfilePicture(event: any): void {
    const target = event.target;
    const files = target.files;

    if (files.length > 0) {
      this.isUplaodReady = true;
      this.selectedFile = files[0];
      // Now you can use the selectedFile as needed (e.g., upload it, display it, etc.)
      //console.log('Selected file:', this.selectedFile!.name);
      //console.log(this.selectedFile)
    }
  }
}
