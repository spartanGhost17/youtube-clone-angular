import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDashboardComponent } from './playlist-dashboard.component';

describe('PlaylistDashboardComponent', () => {
  let component: PlaylistDashboardComponent;
  let fixture: ComponentFixture<PlaylistDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
