import { Component } from '@angular/core';
import { FrameComponent } from '../../components/frame/frame.component';
import { ComponentUpdatesService } from '../../shared/services/app-updates/component-updates.service';

@Component({
    selector: 'app-dashboard-view',
    templateUrl: './dashboard-view.component.html',
    styleUrls: ['./dashboard-view.component.scss'],
    standalone: true,
    imports: [FrameComponent]
})
export class DashboardViewComponent {
  sideMenuOptions: any[] = [];
  section: any[] = [];
  user: any = {
    userId: 'timbaWolf',
    iconURL: '../../../assets/justice_league.jpg'
  };

  constructor(private componentUpdatesService: ComponentUpdatesService) {}


  ngOnInit(): void {
    this.section = [
      {'isActive':true, text: 'Dashboard', icon: 'dashboard', provider: 'google', type: 'outlined', color: '#ff4e46', navigateTo: 'dashboard', sidebarType: 'side'},//this.ICON_HOME
      {'isActive':false, text: 'Content', icon: 'slideshow', provider: 'google', type: 'outlined', color: '#ff4e46', navigateTo: 'content', sidebarType: 'side'},//
      {'isActive':false, text: 'Your permissions', icon: 'key', provider: 'google', type: 'outlined', color: '#ff4e46', navigateTo: 'permissions', sidebarType: 'side'},//
      {'isActive':false, text: 'Analytics', icon: 'insert_chart', provider: 'google', type: 'outlined', color: '#ff4e46', navigateTo: 'dashboard', sidebarType: 'side'},//this.ICON_SUBSCRIPTION
      {'isActive':false, text: 'Comments', icon: 'chat', provider: 'google', type: 'outlined', color: '#ff4e46', navigateTo: 'dashboard', sidebarType: 'side'},
      {'isActive':false, text: 'Subtitles', icon: 'insert_chart', provider: 'google', type: 'outlined', color: '#ff4e46', navigateTo: 'dashboard', sidebarType: 'side'},
      {'isActive':false, text: 'Customization', icon: 'person_edit', provider: 'google', type: 'outlined', color: '#ff4e46', navigateTo: 'edit', sidebarType: 'side'},
    ];
    
    this.sideMenuOptions = [this.section];
    this.componentUpdatesService.sideBarCollapsedEmit(true);
    this.componentUpdatesService.sideBarTypeUpdate('side');
  }
}
