import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdCompleteRegistrationComponent } from './std-complete-registration.component';

describe('StdCompleteRegistrationComponent', () => {
  let component: StdCompleteRegistrationComponent;
  let fixture: ComponentFixture<StdCompleteRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdCompleteRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StdCompleteRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
