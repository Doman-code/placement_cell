import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitedStudentComponent } from './recruited-student.component';

describe('RecruitedStudentComponent', () => {
  let component: RecruitedStudentComponent;
  let fixture: ComponentFixture<RecruitedStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitedStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
