import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {
  nuevoProducto: any = {
    desc_prod: '',
    tipo_prod: null,
    valor_prod: null,
    estado_prod: null
  };
  tiposProducto: any[] = [];
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    // Obtener tipos de producto al inicializar el componente
    this.obtenerTiposProducto();
  }

  obtenerTiposProducto() {
    this.backendService.obtenerTiposProducto().subscribe(
      (response: any[]) => {
        this.tiposProducto = response;
      },
      (error) => {
        console.error('Error al obtener tipos de producto', error);
      }
    );
  }

  registrarProducto() {
    this.backendService.registrarProducto(this.nuevoProducto).subscribe(
      (response) => {
        this.mensajeExito = 'Producto registrado con éxito';
        // Limpiar el formulario después del registro exitoso
        this.nuevoProducto = {
          desc_prod: '',
          tipo_prod: null,
          valor_prod: null,
          estado_prod: true
        };
      },
      (error) => {
        this.mensajeError = 'Error al registrar el producto';
      }
    );
  }

  formularioValido(): boolean {
    return (
      this.nuevoProducto.desc_prod !== '' &&
      this.nuevoProducto.tipo_prod !== null &&
      this.nuevoProducto.valor_prod !== null &&
      typeof this.nuevoProducto.estado_prod === 'boolean'
    );
  }
}


