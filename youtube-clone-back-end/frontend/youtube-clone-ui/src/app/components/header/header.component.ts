import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
  ContentChild,
} from '@angular/core';
import { Icons } from '../../models/icons';
import { ComponentUpdatesService } from '../../services/app-updates/component-updates.service';
import { environment } from 'src/environments/environment';
import { StandardDropdownComponent } from '../dropdown/standard-dropdown/standard-dropdown.component';
import { FormsModule } from '@angular/forms';
import { NgIf, NgStyle, NgFor } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        NgStyle,
        NgFor,
        StandardDropdownComponent,
    ],
})
export class HeaderComponent {
  avatarImage: string = '../../../assets/goku.jpg';
  collapseSideBar: boolean = false;
  searchString: string = '';
  environemntName: string = '';
  searchResults: any[] = [];
  iconDropdown: any[] = [];
  resultBoxDisplay: string = 'none';
  @Input() showSearchBar: boolean = true;
  @Input() openModal: () => void;
  @Output() uploadVideoButtonClicked: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() showSideBar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() searchTriggered: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('submenuTemplate') submenuTemplate: TemplateRef<any>;
  icons: Icons = new Icons();
  ICON_SEARCH_LIGHT: string = '../' + this.icons.iconsPaths['search-light'];
  ICON_YOUTUBE: string = '../' + this.icons.iconsPaths['yt-logo-light'];
  ICON_BURGER: string = '../' + this.icons.iconsPaths['burger-light'];
  ICON_USER: string = '../../../assets/goku.jpg';
  ICON_CAMERA: string = '../' + this.icons.iconsPaths['camera-light'];
  ICON_BELL: string = '../' + this.icons.iconsPaths['bell-dark'];

  constructor(private componentUpdatesService: ComponentUpdatesService) {}

  ngOnInit(): void {
    this.searchResults = [
      { text: 'some text 1' },
      { text: 'some text 2' },
      { text: 'some text 3' },
      { text: 'some text 4' },
      { text: 'some text 5' },
      { text: 'some text 6' },
      { text: 'some text 7' },
      { text: 'some text 8' },
      { text: 'some text 9' },
      { text: 'some text 10' },
    ];
    this.environemntName = environment.name;
    
  }

  ngAfterViewInit() {
    console.log(
      'in frame construct afterViewInit =====> ',
      this.collapseSideBar
    );
    this.componentUpdatesService.sideBarCollapsedEmit(this.collapseSideBar);
    this.populateUserDrowpdown();
  }

  populateUserDrowpdown() {
    this.iconDropdown = [
      //{ header: true, isTemplate: true, template: this.dropdownHeaderTemplate}
      { icon: 'logout', text: 'Logout', action: () => this.logout() },
      {
        icon: 'switch_account',
        text: 'Switch account',
        subMenu: [
          { isSelect: false, template: this.submenuTemplate },
          { isSelect: false, icon: 'person_add', text: 'Add account' },
          { isSelect: false, icon: 'logout', text: 'Sign out' },
        ],
        action: () => this.switchAccount(),
      },
    ];
  }

  switchAccount() {}

  logout() {}

  addVideoButtonClicked() {
    console.log('add video button');
    this.uploadVideoButtonClicked.emit(true);
    this.componentUpdatesService.headerAddVideoEmit(true);
  }

  /**
   * initiate search
   * @param searchString
   * @param origin
   */
  search(searchString: string, origin: string) {
    console.log('search string ', searchString);
    if (origin === 'results') {
      this.searchString = searchString;
    }
    this.resultBoxDisplay = 'none';
    this.searchTriggered.emit(this.searchString);
  }

  /**
   * Hide or show result box
   * @param event search string
   */
  onSearchStringUpdate(event: any) {
    if (event.length >= 1) {
      this.resultBoxDisplay = 'flex';
    } else {
      this.resultBoxDisplay = 'none';
    }
    console.log('onSearchStringUpdate ', event, ' length ');
  }

  /**
   * Toggle sidebar event
   */
  toggleSideBar() {
    this.collapseSideBar = !this.collapseSideBar;
    console.log('toggle side bar ', this.collapseSideBar);
    this.componentUpdatesService.sideBarCollapsedEmit(this.collapseSideBar);
    this.showSideBar.emit(this.collapseSideBar);
  }
}
