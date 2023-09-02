import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component  implements OnInit {
  images: string[] = ['../../../../../assets/images/emp1.jpg', '../../../../../assets/images/emp2.jpg', '../../../../../assets/images/emp3.jpg']; // List of image sources
  texts: string[] = ['DOMAN 4LPA', 'DAULAT 5LPA', 'SURABHI 13LPA'];
  currentIndex = 0; // Current index of the image being displayed
  currentImage!: string; // Current image source
  currentText!: string; // Current text

  imageHeight = '33vh'; // Set the desired height for the images
  imageWidth = '62vh'; 
  constructor() { }

  ngOnInit() {
    this.startAutoplay();
  }

  startAutoplay() {
    setInterval(() => {
      this.autoplayImage();
    }, 3000);
  }

  autoplayImage() {
    this.currentImage = this.images[this.currentIndex]; // Set the current image source
    this.currentText = this.texts[this.currentIndex];

    // Increment the current index and wrap around to the beginning if necessary
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}