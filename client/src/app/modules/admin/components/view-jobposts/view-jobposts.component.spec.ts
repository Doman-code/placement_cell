import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobpostsComponent } from './view-jobposts.component';

describe('ViewJobpostsComponent', () => {
  let component: ViewJobpostsComponent;
  let fixture: ComponentFixture<ViewJobpostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJobpostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJobpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
