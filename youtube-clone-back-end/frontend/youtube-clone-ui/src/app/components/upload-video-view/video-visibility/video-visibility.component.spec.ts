import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoVisibilityComponent } from './video-visibility.component';

describe('VideoVisibiltyComponent', () => {
  let component: VideoVisibilityComponent;
  let fixture: ComponentFixture<VideoVisibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VideoVisibilityComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(VideoVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
