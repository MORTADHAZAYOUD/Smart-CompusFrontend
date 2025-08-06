import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTrackingComponent } from './student-tracking.component';

describe('StudentTrackingComponent', () => {
  let component: StudentTrackingComponent;
  let fixture: ComponentFixture<StudentTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
