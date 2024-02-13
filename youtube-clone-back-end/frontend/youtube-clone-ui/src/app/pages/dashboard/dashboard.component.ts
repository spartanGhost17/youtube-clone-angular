import { Component, ContentChildren, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { Video } from '../../models/video';
import { ComponentUpdatesService } from 'src/app/services/app-updates/component-updates.service';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isVisible: boolean = false;
  isConfirmLoading: boolean = false;
  videoUploaded: boolean = false;
  showVideoDetailSteps: boolean = true;
  videoTitle: string = "Upload video";
  staticTitle: string = "Ultra Instinct ｜ Dragon Ball Super.mp4";//"";

  videoDto: Video = {
    id: "",
    title: "",
    videoStatus: "",
  };

  videoId: string = "https://youtu.be/GMes87zIQ08";//"";
  
  current = 0;
  totalSteps: number = 3;
  nextBtnText: string = "NEXT";

  isShowModal: boolean = false;
  @ViewChildren ('stepTemplate') stepsTemplateRefs: QueryList<TemplateRef<any>>;
  video: Video;
  playlists: Playlist[] = [];
  playlistSelection: any[] = [];
  categories: Playlist[] = [];
  categorySelection: any[] = [];


  constructor(private componentUpdatesService : ComponentUpdatesService) {}

  showModal() {
    console.log("modal before ", this.isShowModal)
    this.isShowModal = !this.isShowModal;
    console.log("modal after ", this.isShowModal)
  }

  ngOnInit(): void {
    console.log("DASHBOARD ON INITIALIZE !!") 
    //if video is draft get from backend, else load default object
    this.getVideo();
    this.getVideoPlaylists();
    this.getCategories();
  }

  ngAfterViewInit() {
    this.componentUpdatesService.headerAddVideo$.subscribe((addVideoClicked) => {
      this.isShowModal  = addVideoClicked;
      console.log("addVideoClicked ", addVideoClicked);
    });

    console.log("stepTemplates ", this.stepsTemplateRefs);
  }

  /**
   * show modal
   * @param event 
  */
  showModalUpdateEvent(event: boolean) {
    console.log("  closed modal ====>  ",event);
    this.isShowModal = event;
    this.current = 0;
  }

  /**
   * show upload video process if upload video button is clicked on header
   * @param value 
   */
  //showModal(value: boolean): void {
  //  console.log('showModal');
  //  this.isVisible = value;
  //}

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }
  /** hide video upload modal on view closed */
  handleCancel(): void {
    this.isVisible = false;
  }

  /**
   * Show video details steps view and hide video upload component when 
   * video was successfully uploaded
   * @param data 
   */
  videoUploadedSucces(data: any){
    console.log(data.uploadStatus, " name ", data.fileName);
    
    if(data){
      //this.videoTitle = data.fileName;
      this.staticTitle = data.fileName;
      this.showVideoDetailSteps = true;//set to true if successfully uploaded video
      //this.videoId = data.videoUploadResponse.id;
      this.video.title = data.fileName;
      this.video.id = data.videoUploadResponse.id;
      //this.videoUploaded = true;
    };
  }

  videoTitleChanged(event: string): void {
    //this.videoTitle = event;
    //if(this.videoTitle=="")
    //  this.videoTitle = "Upload video"; 
    this.video.title = event;
    if(this.video.title === "") {
      this.video.title = "Upload video";
    }
    //console.log("null ",this.videoTitle=="");
    console.log("video TITLE : " + event)//this.videoTitle);
  }

  onModalActiveSessionChange(event: number) {
    this.current = event;
    this.updateNextBtn();
    console.log("active session change ", event);
  }

  /**
   * on previous clicked 
  */
  onPreClicked(): void {
    this.current -= 1;
    if(this.current < 0){
      this.current = 0;
    }
    this.updateNextBtn();
  }

  /**
   * on next clicked 
  */
  onNextClicked(): void {
    this.current += 1;
    if(this.current > this.totalSteps){
      this.current = this.totalSteps;
    }
    this.updateNextBtn();
    //this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  /**
   * update inner text of 'next' button
  */
  updateNextBtn() {
    if(this.current < this.totalSteps) {
      this.nextBtnText = "NEXT"; 
    }
    else if(this.current === this.totalSteps) {
      this.nextBtnText = "UPLOAD";//only if public playlist is chosen, if private just Save
    }
  }
  /*changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      case 3: {
        this.index = 'fourth-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }*/

  onVisibilitySelected(event: any):void {
    console.log("visisbility selected ->", event);
  }

  onPlaylistUpdated(playlists: any) {
    this.playlistSelection = playlists;
  }

  onCategoriesUpdated(categories: any) {
    this.categorySelection = categories;
  }

  //from backend
  getVideo() {
    this.video = {
      id: '',
      title: '',
      description: '',
      tags: [],
      videoStatus: 'PUBLIC',
      thumbnailURL: '../../../assets/mr_wick.jpeg',
      videoURL: '../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4',
      upload_date: '',
      duration: 0,
      views: 0,
    }
  }

  getCategories() {
    
    this.categories = [
      {id: '', title: '#C courses', visibilityStatus: 'PUBLIC'},
      {id: '', title: '#C courses', visibilityStatus: 'PUBLIC'}, 
      {id: '', title: 'Beats kanye', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Adventyre time', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'DBZ Starter pack', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'black airforce energy', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Trap', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Tom & Jerry', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'AMV', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Anime essay', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'funny videos', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Rap', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Samurai origin', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Pranks', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Meek Mill', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Teletubies', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Batman', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Breaking Bad', visibilityStatus: 'PUBLIC'}
    ];

    for(const category of this.categories) {
      this.categorySelection.push({playlist: category, checked: false, matchSearch: true});  
    }
  }

  getVideoPlaylists() {
    this.playlists = [
      {id: '', title: '#C courses', visibilityStatus: 'PUBLIC'},
      {id: '', title: '#C courses', visibilityStatus: 'PUBLIC'}, 
      {id: '', title: 'Beats kanye', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Adventyre time', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'DBZ Starter pack', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'black airforce energy', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Trap', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Tom & Jerry', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'AMV', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Anime essay', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'funny videos', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Rap', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Samurai origin', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Pranks', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Meek Mill', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Teletubies', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Batman', visibilityStatus: 'PUBLIC'},
      {id: '', title: 'Breaking Bad', visibilityStatus: 'PUBLIC'}
    ];

    for(const playlist of this.playlists) {
      this.playlistSelection.push({playlist: playlist, checked: false, matchSearch: true});  
    }
  }
}
