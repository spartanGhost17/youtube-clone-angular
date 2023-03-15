import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoElementsComponent } from './video-elements.component';

describe('VideoElementsComponent', () => {
  let component: VideoElementsComponent;
  let fixture: ComponentFixture<VideoElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoElementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
