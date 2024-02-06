import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent {
  sideMenuOptions: any[] = [];
  section: any[] = [];
  user: any = {
    userId: 'timbaWolf',
    iconURL: '../../../assets/justice_league.jpg'
  };

  constructor() {}


  ngOnInit(): void {
    this.section = [
      {'isActive':true, text: 'Dashboard', icon: 'dashboard', provider: 'google', type: 'outlined', color: '#ff4e46', navigateTo: 'dashboard', sidebarType: 'side'},//this.ICON_HOME
      {'isActive':false, text: 'Content', icon: 'slideshow', provider: 'google', type: 'outlined', color: '#ff4e46', navigateTo: 'test', sidebarType: 'side'},//
      {'isActive':false, text: 'Analytics', icon: 'insert_chart', provider: 'google', type: 'outlined', color: '#ff4e46', navigateTo: 'dashboard', sidebarType: 'side'},//this.ICON_SUBSCRIPTION
      {'isActive':false, text: 'Comments', icon: 'chat', provider: 'google', type: 'outlined', color: '#ff4e46', navigateTo: 'dashboard', sidebarType: 'side'},
      {'isActive':false, text: 'Subtitles', icon: 'insert_chart', provider: 'google', type: 'outlined', color: '#ff4e46', navigateTo: 'dashboard', sidebarType: 'side'},
    ];
    
    this.sideMenuOptions = [this.section];
  }
}
