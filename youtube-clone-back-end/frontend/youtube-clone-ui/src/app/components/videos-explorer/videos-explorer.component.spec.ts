import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosExplorerComponent } from './videos-explorer.component';

describe('VideosExplorerComponent', () => {
  let component: VideosExplorerComponent;
  let fixture: ComponentFixture<VideosExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosExplorerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideosExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
