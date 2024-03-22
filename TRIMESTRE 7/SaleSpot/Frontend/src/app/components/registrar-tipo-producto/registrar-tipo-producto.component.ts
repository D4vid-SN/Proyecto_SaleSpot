import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-registrar-tipo-producto',
  templateUrl: './registrar-tipo-producto.component.html',
  styleUrls: ['./registrar-tipo-producto.component.css']
})
export class RegistrarTipoProductoComponent implements OnInit {
  nombre: string = '';
  mensaje: string = '';
  mensajeBorrar: string = '';
  tiposProducto: any[] = [];
  editarId: number | null = null;

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.obtenerTiposProducto();
  }

  onSubmit() {
    // Comprueba si el campo de nombre está vacío
    if (!this.nombre.trim()) {
      this.mensaje = 'El nombre del tipo de producto es obligatorio.';
      return;
    }

    const nuevoTipoProducto = {
      tipo_prod: this.nombre
    };

    this.backendService.registrarTipoProducto(nuevoTipoProducto).subscribe(
      (response) => {
        console.log('Tipo de producto registrado con éxito:', response);
        this.mensaje = 'Tipo de producto registrado con éxito';
        this.obtenerTiposProducto(); // Actualiza la lista después de registrar
      },
      (error) => {
        console.error('Error al registrar el tipo de producto:', error);
        this.mensaje = 'Error al registrar el tipo de producto';
      }
    );
  }

  obtenerTiposProducto() {
    this.backendService.obtenerTiposProducto().subscribe(
      (tiposProducto) => {
        this.tiposProducto = tiposProducto;
      },
      (error) => {
        console.error('Error al obtener tipos de producto:', error);
      }
    );
  }

  actualizarTipoProducto(id: number) {
    this.editarId = id;
    this.mensaje = ''; // Limpiar mensajes al iniciar la edición
  }

  guardarCambiosTipoProducto(id: number, nuevoNombre: string) {
    // Comprueba si el nuevo nombre está vacío
    if (!nuevoNombre.trim()) {
      this.mensaje = 'El nombre del tipo de producto es obligatorio.';
      return;
    }

    // Aquí implementa la lógica para enviar el nuevo nombre al backend y actualizar
    this.backendService.actualizarTipoProducto(id, { tipo_prod: nuevoNombre }).subscribe(
      (response) => {
        console.log('Tipo de producto actualizado con éxito:', response);
        this.mensaje = 'Tipo de producto actualizado con éxito';
        this.editarId = null; // Finaliza la edición
        this.obtenerTiposProducto(); // Actualiza la lista después de actualizar
      },
      (error) => {
        console.error('Error al actualizar el tipo de producto:', error);
        this.mensaje = 'Error al actualizar el tipo de producto';
      }
    );
  }

  eliminarTipoProducto(id: number) {
    // Implementa la lógica para eliminar un tipo de producto
    this.backendService.eliminarTipoProducto(id).subscribe(
      (response) => {
        console.log('Tipo de producto eliminado con éxito:', response);
        this.mensajeBorrar = 'Tipo de producto eliminado con éxito';
        this.obtenerTiposProducto(); // Actualiza la lista después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el tipo de producto:', error);
        this.mensajeBorrar = 'Error al eliminar el tipo de producto';
      }
    );
  }
}

