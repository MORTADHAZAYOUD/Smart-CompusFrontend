import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAttendanceComponent } from './child-attendance.component';

describe('ChildAttendanceComponent', () => {
  let component: ChildAttendanceComponent;
  let fixture: ComponentFixture<ChildAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
