import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementSchedComponent } from './placement-sched.component';

describe('PlacementSchedComponent', () => {
  let component: PlacementSchedComponent;
  let fixture: ComponentFixture<PlacementSchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacementSchedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementSchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
