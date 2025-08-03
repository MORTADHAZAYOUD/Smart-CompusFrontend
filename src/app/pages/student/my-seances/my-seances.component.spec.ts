import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySeancesComponent } from './my-seances.component';

describe('MySeancesComponent', () => {
  let component: MySeancesComponent;
  let fixture: ComponentFixture<MySeancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySeancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySeancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
