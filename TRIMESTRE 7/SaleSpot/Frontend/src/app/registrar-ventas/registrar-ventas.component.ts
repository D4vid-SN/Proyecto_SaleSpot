import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-ventas.component.html',
  styleUrls: ['./registrar-ventas.component.css']
})
export class RegistrarVentaComponent implements OnInit {
  selectedProductId: any;

  nuevaVenta: any = {
    fecha_venta: '',
    tdoc_user: '',
    id_user: null,
    id_prod: null,
    cant_prod: null,
    subtotal: null,
    iva: null,
    total_venta: null
  };

  tiposDocumento: any[] = [];
  productos: any[] = [];
  tipoProductoSeleccionado: any;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private ngZone: NgZone, private backendService: BackendService) {}

  ngOnInit() {
    this.ngZone.run(() => {
      this.obtenerProductos();
      this.obtenerTiposDocumento();
    });
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

  obtenerProductos() {
    this.backendService.obtenerProductos().subscribe(
      (response: any[]) => {
        this.productos = response;
      },
      (error) => {
        console.error('Error al obtener la lista de productos', error);
      }
    );
  }

  cargarDescripcionTipoProducto() {
    if (this.selectedProductId !== null && this.selectedProductId !== undefined) {
      // Solo almacena el ID del producto, no el objeto completo
      this.nuevaVenta.id_prod = this.selectedProductId;
    } else {
      this.nuevaVenta.id_prod = null;
    }
  }
  
  registrarVenta() {
    // Validar el formulario antes de registrar la venta
    if (!this.formularioValido()) {
      this.mensajeError = 'Por favor, complete todos los campos obligatorios.';
      return;
    }

    if (this.nuevaVenta.id_prod) {
      // Solo almacena el ID del producto, no el objeto completo
      const datosVenta = {
        fecha_venta: this.nuevaVenta.fecha_venta,
        tdoc_user: this.nuevaVenta.tdoc_user,
        id_user: this.nuevaVenta.id_user,
        id_prod: this.nuevaVenta.id_prod,
        cant_prod: this.nuevaVenta.cant_prod,
        subtotal: this.nuevaVenta.subtotal,
        iva: this.nuevaVenta.iva,
        total_venta: this.nuevaVenta.total_venta
      };

      console.log('Datos enviados al backend:', datosVenta);

      this.backendService.registrarVenta(datosVenta)
        .subscribe(
          (response) => {
            this.mensajeExito = response.message;
            this.mensajeError = '';
            this.nuevaVenta = {
              fecha_venta: '',
              tdoc_user: '',
              id_user: null,
              id_prod: null,
              cant_prod: null,
              subtotal: null,
              iva: null,
              total_venta: null
            };
            this.tipoProductoSeleccionado = null;
          },
          (error) => {
            this.mensajeError = 'Error al registrar la venta';
            this.mensajeExito = '';
          }
        );
    } else {
      this.mensajeError = 'Seleccione un tipo de producto válido';
      this.mensajeExito = '';
    }
  }

  formularioValido(): boolean {
    // Implementa tu lógica de validación según sea necesario
    return (
      this.nuevaVenta.fecha_venta !== '' &&
      this.nuevaVenta.tdoc_user !== '' &&
      this.nuevaVenta.id_user !== null &&
      this.nuevaVenta.id_prod !== null &&
      this.nuevaVenta.cant_prod !== null &&
      this.nuevaVenta.subtotal !== null &&
      this.nuevaVenta.iva !== null &&
      this.nuevaVenta.total_venta !== null
    );
  }
}

