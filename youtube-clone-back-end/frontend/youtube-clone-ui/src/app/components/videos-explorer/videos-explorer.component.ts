import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/models/video';
import { ComponentUpdatesService } from 'src/app/services/app-updates/component-updates.service';

@Component({
  selector: 'app-videos-explorer',
  templateUrl: './videos-explorer.component.html',
  styleUrls: ['./videos-explorer.component.scss']
})
export class VideosExplorerComponent {
  
  sibarWidth: string;
  sidebarType: string = 'hover';
  //video: Video = ;
  videos: any[] = [
    {video: '', navigateTo: 'watch'}
  ];

  constructor(private componentUpdatesService :ComponentUpdatesService,
    private router: Router, private activatedRoute: ActivatedRoute){
    this.componentUpdatesService.sideBarCurrentWidth$.subscribe((width) => {
      console.log(`width ${width}`);
      this.sibarWidth = width;
    })
  }
  
  openVideo() {
    //for(this.vide)
    //this.router.navigate([this.videos[i].navigateTo],{relativeTo:this.activatedRoute});
    console.log("open watch ");
    const videoId = "1234455yuwrct";
    const url = `home/watch`;
    this.router.navigate([url], {queryParams: {v: `${videoId}`}} );
  }

  updateHoverType() {
    this.componentUpdatesService.sideBarTypeUpdate(this.sidebarType)
  }

  test() {
    this.componentUpdatesService.sideBarCurrentWidth$.subscribe((width) => {
      console.log(`width ${width}`);
    })
  }
}
