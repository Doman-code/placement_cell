import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `<div class="cardimages">
  <div class="card ">
  <img class="card-img-top" [src]="imageUrl" alt="Card image">
  <div class="card-body">
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">{{ description }}</p>
  </div>
</div> 
</div>`,
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() imageUrl: string | undefined;
  @Input() title: string | undefined;
  @Input() description: string | undefined;
}
