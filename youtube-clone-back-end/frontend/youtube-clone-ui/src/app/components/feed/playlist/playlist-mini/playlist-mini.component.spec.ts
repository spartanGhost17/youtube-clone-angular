import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistMiniComponent } from './playlist-mini.component';

describe('PlaylistMiniComponent', () => {
  let component: PlaylistMiniComponent;
  let fixture: ComponentFixture<PlaylistMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PlaylistMiniComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
