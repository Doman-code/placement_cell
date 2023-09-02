import { Component } from '@angular/core';

@Component({
  selector: 'app-card-slider',
  template: ` <ngb-carousel *ngIf="cards" [showNavigationArrows]="true" [showNavigationIndicators]="true" [pauseOnHover]="false" [interval]="2000" class="company">
  <ng-template ngbSlide *ngFor="let card of cards">
    <app-card [imageUrl]="card.imageUrl" [title]="card.title" [description]="card.description"></app-card>
  </ng-template>
</ngb-carousel>`,
  styleUrls: ['./card-slider.component.scss']
})
export class CardSliderComponent {
  cards = [
    {
      imageUrl: '../assets/images/company.jpg',
      title: 'Card 1',
      description: 'Description for Card 1'
    },
    {
      imageUrl: '../assets/images/company.jpg',
      title: 'Card 2',
      description: 'Description for Card 2'
    },

    {
      imageUrl: '../assets/images/company.jpg',
      title: 'Card 2',
      description: 'Description for Card 2'
    },

    {
      imageUrl: '../assets/images/company.jpg',
      title: 'Card 2',
      description: 'Description for Card 2'
    },

    
    // Add more cards as needed
  ];
}
