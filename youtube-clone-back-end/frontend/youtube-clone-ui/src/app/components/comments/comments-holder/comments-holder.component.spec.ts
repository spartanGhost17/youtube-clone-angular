import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsHolderComponent } from './comments-holder.component';

describe('CommentsHolderComponent', () => {
  let component: CommentsHolderComponent;
  let fixture: ComponentFixture<CommentsHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CommentsHolderComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CommentsHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
