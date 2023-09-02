import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherdetailComponent } from './otherdetail.component';

describe('OtherdetailComponent', () => {
  let component: OtherdetailComponent;
  let fixture: ComponentFixture<OtherdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
