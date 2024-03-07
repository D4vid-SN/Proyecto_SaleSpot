import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

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
  tiposDocumento: any[] = [];

  constructor(private loginService: BackendService, private router: Router) {}

  ngOnInit(): void {
    // Llama al servicio para obtener los tipos de documento al inicializar el componente
    this.obtenerTiposDocumento();
  }

  obtenerTiposDocumento() {
    // Llama al método del servicio BackendService para obtener los tipos de documento
    this.loginService.obtenerTiposDocumento().subscribe(
      (response: any[]) => {
        this.tiposDocumento = response; // Almacena la lista de tipos de documento
      },
      (error) => {
        console.error('Error al obtener tipos de documento', error);
      }
    );
  }

  login() {
    // Validar que los campos no estén vacíos antes de realizar el inicio de sesión
    if (!this.tdoc || !this.id || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    this.loginService.login(this.tdoc, this.id!, this.password).subscribe(
      (response: any) => {
        // Manejar la respuesta del servidor aquí
        if (response.token) {
          // Almacena el token en LocalStorage
          localStorage.setItem('token', response.token);

          // Imprimir información del token y usuario por consola
          console.log('Token:', response.token);
          console.log('Usuario:', response.usuario);
          console.log('Rol:', response.rol);

          // Redirecciona a la página de inicio o realizar otras acciones necesarias
          this.router.navigate(['menu']);
        }
      },
      (error) => {
        // Manejar los errores aquí
        console.error('Error al iniciar sesión', error);
        this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tus datos.';
      }
    );
  }
}






