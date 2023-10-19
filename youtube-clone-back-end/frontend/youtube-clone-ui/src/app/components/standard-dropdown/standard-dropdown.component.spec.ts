import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardDropdownComponent } from './standard-dropdown.component';

describe('StandardDropdownComponent', () => {
  let component: StandardDropdownComponent;
  let fixture: ComponentFixture<StandardDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
