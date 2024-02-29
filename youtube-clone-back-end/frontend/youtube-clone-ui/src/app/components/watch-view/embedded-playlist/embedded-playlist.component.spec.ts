import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedPlaylistComponent } from './embedded-playlist.component';

describe('EmbeddedPlaylistComponent', () => {
  let component: EmbeddedPlaylistComponent;
  let fixture: ComponentFixture<EmbeddedPlaylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmbeddedPlaylistComponent]
    });
    fixture = TestBed.createComponent(EmbeddedPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
