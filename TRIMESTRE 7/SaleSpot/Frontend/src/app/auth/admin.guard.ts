import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token existe y contiene la información del rol
    if (token) {
      // Decodificar el token para obtener la información del usuario y su rol
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));

      // Verificar si el rol del usuario es de administrador
      if (tokenPayload && tokenPayload.rol && tokenPayload.rol === 'Administrador') {
        return true; // Permitir el acceso a la ruta
      }
    }

    // Si el usuario no es un administrador, redirigir a una página de acceso denegado
    this.router.navigate(['/']);
    return false;
  }
}








