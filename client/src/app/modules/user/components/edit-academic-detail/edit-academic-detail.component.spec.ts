import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAcademicDetailComponent } from './edit-academic-detail.component';

describe('EditAcademicDetailComponent', () => {
  let component: EditAcademicDetailComponent;
  let fixture: ComponentFixture<EditAcademicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAcademicDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAcademicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
