import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  sidebarOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(event: any): void {
    this.sidebarOpen = event;
    console.log("side bar:  ", this.sidebarOpen);
  }
}
