import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRegistraionComponent } from './c-registraion.component';

describe('CRegistraionComponent', () => {
  let component: CRegistraionComponent;
  let fixture: ComponentFixture<CRegistraionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRegistraionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRegistraionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
