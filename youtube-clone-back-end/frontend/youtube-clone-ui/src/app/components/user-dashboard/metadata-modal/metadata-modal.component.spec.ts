import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataModalComponent } from './metadata-modal.component';

describe('MetadataModalComponent', () => {
  let component: MetadataModalComponent;
  let fixture: ComponentFixture<MetadataModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MetadataModalComponent]
    });
    fixture = TestBed.createComponent(MetadataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
