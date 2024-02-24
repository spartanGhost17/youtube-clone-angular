import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCardBasicComponent } from './video-card-basic.component';

describe('VideoCardBasicComponent', () => {
  let component: VideoCardBasicComponent;
  let fixture: ComponentFixture<VideoCardBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VideoCardBasicComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(VideoCardBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
