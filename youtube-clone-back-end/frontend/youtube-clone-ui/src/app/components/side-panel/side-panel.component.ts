import { AsyncPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { ComponentUpdatesService } from 'src/app/shared/services/app-updates/component-updates.service';
import {
  selectCurrentUser,
  selectIsLoading,
  selectSubscriptions,
  selectValidationErrors,
  selectValidationMessages,
} from '../../shared/store/user/reducers';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { ResponseMessagesInterface } from '../../shared/types/responseMessages.interface';
import { CurrentUserStateInterface } from '../../shared/types/state/currentUserState.interface';
import { userActions } from '../../shared/store/user/actions';
import { subscribe } from 'diagnostics_channel';
import { UserInterface } from '../../shared/types/user.interface';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  standalone: true,
  imports: [NgIf, NgStyle, NgFor, NgClass, AsyncPipe],
})
export class SidePanelComponent {
  @Input() collapse: boolean = false;
  @Input() showUserIcon: boolean = false;
  hoverPanel: boolean = false;

  MIN_WIDTH: string = '72px';
  MAX_WIDTH: string = '240px';

  data$: Observable<{
    isLoading: boolean;
    currentUser: CurrentUserInterface | null | undefined;
    subscriptions: UserInterface[] | undefined,
    validationMessages: ResponseMessagesInterface | null;
    validationErrors: ResponseMessagesInterface | null;
  }>;

  @Input() sections: any[];
  //@Input() user: any;

  FILL_ICON: string = `'FILL' 1, 'wght' 200, 'GRAD' 0, 'opsz' 24`;
  EMPTY_FILL_ICON: string = `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24`;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentUpdatesService: ComponentUpdatesService,
    private store: Store<{ user: CurrentUserStateInterface }>
  ) {}
  /**
   * Lifecycle hook
   */
  ngOnInit() {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      currentUser: this.store.select(selectCurrentUser),
      subscriptions: this.store.select(selectSubscriptions),
      validationMessages: this.store.select(selectValidationMessages),
      validationErrors: this.store.select(selectValidationErrors),
    });

    this.componentUpdatesService.sideBarType$.subscribe((sidebarType) => {
      if (sidebarType === 'side') {
        this.hoverPanel = false;
      } else {
        this.hoverPanel = true;
      }
    });

    this.componentUpdatesService.sideBarCollapsed$.subscribe((collapsed) => {
      this.collapse = collapsed;

      this.onCollapse(this.collapse);
    });
  }

  ngAfterViewInit() {
    this.componentUpdatesService.sideBarWidthUpdate(this.MAX_WIDTH);
    this.sections[0][0].isActive = true;
    this.makeButtonActive(this.sections[0][0]);
  }

  onCollapse(collapsed: boolean) {
    if (collapsed) {
      this.componentUpdatesService.sideBarWidthUpdate(this.MIN_WIDTH); //broadcast width of side panel
    } else {
      this.componentUpdatesService.sideBarWidthUpdate(this.MAX_WIDTH);
    }
  }

  /**
   * change button status to active
   * @param button
   */
  makeButtonActive(button: any) {
    for (const section of this.sections) {
      this.activeButtonHelper(button, section);
    }
  }

  /**
   * set all buttons to innactive except for the one that has been clicked
   * @param button
   * @param section1
   */
  activeButtonHelper(button: any, section: any[]) {
    for (let i = 0; i < section.length; i++) {
      if (section.includes(button)) {
        if (i === section.indexOf(button)) {
          section[i].isActive = true;
          section[i].type = 'fill';

          this.componentUpdatesService.sideBarTypeUpdate(
            section[i].sidebarType
          );

          let params = {};
          //add params
          if (section[i].playlistName) {
            params = {
              relativeTo: this.activatedRoute,
              queryParams: { list: section[i].playlistName }, // Replace 'yourListValueHere' with the actual value
              queryParamsHandling: 'merge', // This ensures that existing query parameters are preserved
            };
          } else {
            params = {
              relativeTo: this.activatedRoute,
            };
          }

          if (!section[i].newTab) {
            if (section[i].isChannel) {
              this.router.navigate([`${section[i].navigateTo}${section[i].username}`]); //${section[i].text}
            } else {
              if (Object.keys(params).length > 0) {
                this.router.navigate([section[i].navigateTo], params);
              } else {
                this.router.navigate([section[i].navigateTo]);
              }
            }
          } else {
            //TODO: figure out how to perist user ngrx session
            //this.router.navigate([section[i].navigateTo]);
            this.router.navigate([section[i].navigateTo]);
            // Open the link in a new tab
            //window.open(`${section[i].navigateTo}`, '_blank');
          }
        } else {
          section[i].isActive = false;
          section[i].type = 'outlined';
        }
      } else {
        section[i].isActive = false;
        section[i].type = 'outlined';
      }
    }
  }
}
