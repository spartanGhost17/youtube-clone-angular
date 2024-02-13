import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistMetadataComponent } from './playlist-metadata.component';

describe('PlaylistMetadataComponent', () => {
  let component: PlaylistMetadataComponent;
  let fixture: ComponentFixture<PlaylistMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistMetadataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
