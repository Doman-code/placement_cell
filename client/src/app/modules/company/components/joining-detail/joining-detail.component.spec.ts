import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoiningDetailComponent } from './joining-detail.component';

describe('JoiningDetailComponent', () => {
  let component: JoiningDetailComponent;
  let fixture: ComponentFixture<JoiningDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoiningDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoiningDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
