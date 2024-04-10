import { Component, Input } from '@angular/core';
import { ComponentUpdatesService } from '../../shared/services/app-updates/component-updates.service';
import { RouterOutlet } from '@angular/router';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { NgStyle, NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-frame',
    templateUrl: './frame.component.html',
    styleUrls: ['./frame.component.scss'],
    standalone: true,
    imports: [HeaderComponent, NgStyle, SidePanelComponent, NgIf, RouterOutlet]
})
export class FrameComponent {
  sidebarOpen = false;
  sidebarType: string;
  @Input() sideMenuOptions: any[] = [];
  @Input() showUserIcon: boolean;
  
  constructor(private componentUpdatesService: ComponentUpdatesService) { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.componentUpdatesService.sideBarType$.subscribe((sidebarType) => {
      this.sidebarType = sidebarType;
    });
  }

  toggleSidebar(event: any): void {
    this.sidebarOpen = event;
  }
}
