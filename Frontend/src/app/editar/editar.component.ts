import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  usuario: any = {
    tdoc_user: '',
    id_user: null,
    nombre_1: '',
    nombre_2: '',
    apellido_1: '',
    apellido_2: '',
    email: '', 
    rol: '',
    estado: true
  };
  mensajeExito: string = '';
  mensajeError: string = '';
  roles: any[] = [];

  // Expresiones regulares para validar los campos de nombre y apellido
  nombreApellidoRegex: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

  // Expresión regular para validar una dirección de correo electrónico
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const tdoc_user: string = params['tdoc_user'];
      const id_user: number = +params['id_user'];

      // Obtener la información del usuario para mostrar en el formulario
      this.backendService.consultarUsuario(tdoc_user, id_user).subscribe(
        (response: any) => {
          this.usuario = response;
          this.usuario.estado = !!this.usuario.estado;
        },
        error => {
          console.error('Error al obtener la información del usuario', error);
        }
      );

      // Obtener los roles y asignarlos a la propiedad roles
      this.backendService.obtenerRoles().subscribe(
        (response: any[]) => {
          this.roles = response;
        },
        error => {
          console.error('Error al obtener los roles', error);
        }
      );
    });
  }

  actualizarUsuario() {
    // Validar si hay campos vacíos
    if (!this.formularioCompleto()) {
      this.mensajeError = 'Datos incompletos. Por favor, complete todos los campos obligatorios.';
      return;
    }

    // Validar los campos de nombre y apellido con expresiones regulares
    if (!this.nombreApellidoRegex.test(this.usuario.nombre_1)) {
      this.mensajeError = 'El primer nombre no es válido';
      return;
    }

    if (this.usuario.nombre_2 && !this.nombreApellidoRegex.test(this.usuario.nombre_2)) {
      this.mensajeError = 'El segundo nombre no es válido';
      return;
    }

    if (!this.nombreApellidoRegex.test(this.usuario.apellido_1)) {
      this.mensajeError = 'El primer apellido no es válido';
      return;
    }

    if (this.usuario.apellido_2 && !this.nombreApellidoRegex.test(this.usuario.apellido_2)) {
      this.mensajeError = 'El segundo apellido no es válido';
      return;
    }

    // Validar el formato del correo electrónico
    if (!this.emailRegex.test(this.usuario.email)) {
      this.mensajeError = 'El correo electrónico no es válido';
      return;
    }

    // Llama al método actualizarUsuario del servicio para enviar la información actualizada
    this.backendService.actualizarUsuario(this.usuario.tdoc_user, this.usuario.id_user, this.usuario).subscribe(
      response => {
        // Maneja la respuesta del backend
        this.mensajeExito = 'Usuario actualizado con éxito';
      },
      error => {
        console.error('Error al actualizar el usuario', error);
        this.mensajeError = 'Error al actualizar el usuario';
      }
    );
  }

  formularioCompleto(): boolean {
    return (
      this.usuario.tdoc_user &&
      this.usuario.id_user &&
      this.usuario.nombre_1 &&
      this.usuario.apellido_1 &&
      this.usuario.email &&
      this.usuario.rol !== undefined &&
      this.usuario.estado !== null
    );
  }
}

