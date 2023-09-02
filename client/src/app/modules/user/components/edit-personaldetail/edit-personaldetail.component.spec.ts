import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonaldetailComponent } from './edit-personaldetail.component';

describe('EditPersonaldetailComponent', () => {
  let component: EditPersonaldetailComponent;
  let fixture: ComponentFixture<EditPersonaldetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPersonaldetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPersonaldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
