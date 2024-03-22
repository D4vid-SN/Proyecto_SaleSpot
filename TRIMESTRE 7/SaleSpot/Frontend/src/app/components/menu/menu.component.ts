import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private backendService: BackendService) {}

  isAdmin(): boolean {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Decodificar el token para obtener la información del usuario y su rol
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      // Verificar si el rol del usuario es administrador
      return tokenPayload.rol === 'Administrador';
    }
    return false; // Devolver false si no se encuentra el token
  }
}

