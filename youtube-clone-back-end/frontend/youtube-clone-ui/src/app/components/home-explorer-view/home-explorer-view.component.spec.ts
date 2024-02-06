import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExplorerViewComponent } from './home-explorer-view.component';

describe('HomeExplorerViewComponent', () => {
  let component: HomeExplorerViewComponent;
  let fixture: ComponentFixture<HomeExplorerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeExplorerViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeExplorerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
