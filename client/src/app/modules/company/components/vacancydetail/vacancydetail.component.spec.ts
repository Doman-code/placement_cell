import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancydetailComponent } from './vacancydetail.component';

describe('VacancydetailComponent', () => {
  let component: VacancydetailComponent;
  let fixture: ComponentFixture<VacancydetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacancydetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacancydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
