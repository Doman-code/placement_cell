import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveVacancyComponent } from './approve-vacancy.component';

describe('ApproveVacancyComponent', () => {
  let component: ApproveVacancyComponent;
  let fixture: ComponentFixture<ApproveVacancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveVacancyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
