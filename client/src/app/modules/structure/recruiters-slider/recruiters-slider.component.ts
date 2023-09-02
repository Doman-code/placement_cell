import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-recruiters-slider',
  templateUrl: './recruiters-slider.component.html',
  styleUrls: ['./recruiters-slider.component.scss']
})
export class RecruitersSliderComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay:true,

    autoplayTimeout:4000,
    autoplaySpeed:2000,
    autoplayHoverPause:true,

    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

}
