import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsViewComponent } from './subscriptions-view.component';

describe('SubscriptionsViewComponent', () => {
  let component: SubscriptionsViewComponent;
  let fixture: ComponentFixture<SubscriptionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
