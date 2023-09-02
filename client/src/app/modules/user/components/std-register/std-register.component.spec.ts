import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdRegisterComponent } from './std-register.component';

describe('StdRegisterComponent', () => {
  let component: StdRegisterComponent;
  let fixture: ComponentFixture<StdRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StdRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
