import { AsyncPipe, CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgProgressModule } from 'ngx-progressbar';
import { Observable, combineLatest } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';
import { Icons } from '../../models/icons';
import { ComponentUpdatesService } from '../../shared/services/app-updates/component-updates.service';
import { PersistanceService } from '../../shared/services/persistance/persistance.service';
import { permissionsActions } from '../../shared/store/permission/actions';
import { userActions } from '../../shared/store/user/actions';
import { selectCurrentUser } from '../../shared/store/user/reducers';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { CurrentUserStateInterface } from '../../shared/types/state/currentUserState.interface';
import { authActions } from '../auth/store/actions';
import { StandardDropdownComponent } from '../dropdown/standard-dropdown/standard-dropdown.component';
import { TokenType } from '../auth/enum/tokenType.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    FormsModule,
    NgStyle,
    NgFor,
    StandardDropdownComponent,
    NgProgressModule,
    RouterLink,
    TooltipDirective,
    AsyncPipe,
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

  data$: Observable<{
    currentUser: CurrentUserInterface | null | undefined;
  }>;

  constructor(
    private componentUpdatesService: ComponentUpdatesService,
    private store: Store<{ user: CurrentUserStateInterface }>,
    private persistanceService: PersistanceService
  ) {}

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
    this.data$ = combineLatest({
      currentUser: this.store.select(selectCurrentUser),
    });

    //if user is logged in
    if(this.persistanceService.get(TokenType.ACCESS)) {
      this.getAllRoles();
      this.getProfile();
    }
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

  /**
   * logout
   */
  logout() {
    this.store.dispatch(authActions.logOut());
  }

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

  /**
   * get all roles
   */
  getAllRoles(): void {
    this.store.dispatch(permissionsActions.loadAllPermissions());
  }

  /**
   * get user profile
   */
  getProfile(): void {
    this.store.dispatch(userActions.loadProfile());
  }
}
