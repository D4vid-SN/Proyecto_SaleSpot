import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  rolUsuario: string = '';
  isMenuOpen: boolean = false;

  ngOnInit() {
    this.rolUsuario = localStorage.getItem('rolUsuario') || '';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
