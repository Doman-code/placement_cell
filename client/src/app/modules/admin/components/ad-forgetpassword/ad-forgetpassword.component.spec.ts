import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdForgetpasswordComponent } from './ad-forgetpassword.component';

describe('AdForgetpasswordComponent', () => {
  let component: AdForgetpasswordComponent;
  let fixture: ComponentFixture<AdForgetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdForgetpasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdForgetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
