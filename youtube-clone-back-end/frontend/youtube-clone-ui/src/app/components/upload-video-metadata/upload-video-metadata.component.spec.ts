import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadVideoMetadataComponent } from './upload-video-metadata.component';

describe('UploadVideoMetadataComponent', () => {
  let component: UploadVideoMetadataComponent;
  let fixture: ComponentFixture<UploadVideoMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadVideoMetadataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadVideoMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
