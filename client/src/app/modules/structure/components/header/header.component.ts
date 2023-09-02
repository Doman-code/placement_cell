import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navbarCollapsed = true;
toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
}
  menuType: String = 'default';
  constructor(private route: Router) {

  }
  ngOnInit(): void {

  }
  
}
