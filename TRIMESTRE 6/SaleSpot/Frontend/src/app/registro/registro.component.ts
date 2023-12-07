import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nuevoUsuario: any = {
    tdoc_user: '',
    id_user: null,
    nombre_1: '',
    nombre_2: '',
    apellido_1: '',
    apellido_2: '',
    email: '', 
    rol: '',
    estado: null
  };
  tiposDocumento: any[] = [];
  roles: any[] = [];
  mensajeExito: string = '';
  mensajeError: string = '';
  passwordGenerado: string = ''; // Agregamos una propiedad para almacenar el password generado

  // Expresión regular para validar una dirección de correo electrónico
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    // Obtener tipos de documento y roles al inicializar el componente
    this.obtenerTiposDocumento();
    this.obtenerRoles();
  }

  obtenerTiposDocumento() {
    this.backendService.obtenerTiposDocumento().subscribe(
      (response: any[]) => {
        this.tiposDocumento = response;
      },
      (error) => {
        console.error('Error al obtener tipos de documento', error);
      }
    );
  }

  obtenerRoles() {
    this.backendService.obtenerRoles().subscribe(
      (response: any[]) => {
        this.roles = response;
      },
      (error) => {
        console.error('Error al obtener roles', error);
      }
    );
  }

// ...

registrarUsuario() {
  if (!this.emailRegex.test(this.nuevoUsuario.email)) {
    this.mensajeError = 'El correo electrónico no es válido';
    return;
  }

  this.backendService.registrarUsuario(this.nuevoUsuario).subscribe(
    (response) => {
      // Si el registro es exitoso, mostramos el password generado
      this.mensajeExito = 'Usuario registrado con éxito';
      this.passwordGenerado = response.password; // Asignamos el password generado
    },
    (error) => {
      if (error.status === 400) {
        this.mensajeError = 'Datos de usuario inválidos';
      } else if (error.status === 404) {
        this.mensajeError = 'Tipo de documento, rol o usuario no encontrados';
      } else {
        this.mensajeError = 'Error desconocido al registrar usuario';
      }
    }
  );
}

  formularioValido(): boolean {
    return (
      this.nuevoUsuario.tdoc_user &&
      this.nuevoUsuario.id_user &&
      this.nuevoUsuario.nombre_1 &&
      this.nuevoUsuario.apellido_1 &&
      this.nuevoUsuario.email &&
      this.nuevoUsuario.rol !== undefined &&
      this.nuevoUsuario.estado !== undefined
    );
  }
  
}

