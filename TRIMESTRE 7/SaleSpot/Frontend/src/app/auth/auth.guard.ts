import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Aquí implementa la lógica para verificar si el usuario está autenticado
    const isAuthenticated = !!localStorage.getItem('token'); // Verifica si hay un token en localStorage

    if (isAuthenticated) {
      return true; // Permite el acceso a la ruta
    } else {
      // Redirige a la página de inicio de sesión si el usuario no está autenticado
      this.router.navigate(['/login']);
      return false; // Bloquea el acceso a la ruta
    }
  }
}

