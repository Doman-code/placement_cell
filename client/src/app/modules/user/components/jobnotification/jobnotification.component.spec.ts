import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobnotificationComponent } from './jobnotification.component';

describe('JobnotificationComponent', () => {
  let component: JobnotificationComponent;
  let fixture: ComponentFixture<JobnotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobnotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
