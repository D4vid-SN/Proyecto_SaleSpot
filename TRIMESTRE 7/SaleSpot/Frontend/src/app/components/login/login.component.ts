import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { TipoDocumento, LoginResponse } from '../../models/usuario.model'; // Importa las interfaces

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  tdoc: string = '';
  id: number | null = null;
  password: string = '';
  errorMessage: string = '';
  rolUsuario: string = '';
  tiposDocumento: TipoDocumento[] = []; // Usa la interfaz TipoDocumento

  constructor(private loginService: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerTiposDocumento();
  }

  obtenerTiposDocumento() {
    this.loginService.obtenerTiposDocumento().subscribe(
      (response: TipoDocumento[]) => { // Usa la interfaz TipoDocumento
        this.tiposDocumento = response;
      },
      (error) => {
        console.error('Error al obtener tipos de documento', error);
      }
    );
  }

  login() {
    if (!this.tdoc || !this.id || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    this.loginService.login(this.tdoc, this.id!, this.password).subscribe(
      (response: LoginResponse) => { // Usa la interfaz LoginResponse
        if (response.token) {
          localStorage.setItem('token', response.token);
          console.log('Token:', response.token);
          console.log('Usuario:', response.usuario);
          console.log('Rol:', response.rol);
          this.router.navigate(['menu']);
          localStorage.setItem('rolUsuario', response.rol);
        }
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tus datos.';
      }
    );
  }
}
