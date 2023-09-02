import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitersSliderComponent } from './recruiters-slider.component';

describe('RecruitersSliderComponent', () => {
  let component: RecruitersSliderComponent;
  let fixture: ComponentFixture<RecruitersSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitersSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitersSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
