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
    // Asegurarse de que selectedProductId no es nulo o indefinido
    if (this.selectedProductId !== null && this.selectedProductId !== undefined) {
      // Buscar el tipo de producto por ID en la lista de productos
      const selectedProduct = this.productos.find(producto => producto.id_prod === this.selectedProductId);

      if (selectedProduct) {
        // Si el producto seleccionado se encuentra, cargar su descripción
        this.tipoProductoSeleccionado = selectedProduct;
        this.nuevaVenta.id_prod = this.selectedProductId; // Asignar el ID del producto a la propiedad nuevaVenta
      }
    }
  }
  

  registrarVenta() {
    // Verificar que el tipoProductoSeleccionado está definido y tiene un ID
    if (this.tipoProductoSeleccionado && this.tipoProductoSeleccionado.id_prod) {
      // Asignar el ID del producto al objeto nuevaVenta
      this.nuevaVenta.id_prod = this.tipoProductoSeleccionado.id_prod;
  
      // Enviar la solicitud al backend
      this.backendService.registrarVenta(this.nuevaVenta)
        .subscribe(
          (response) => {
            this.mensajeExito = response.message;
            this.mensajeError = '';
            // Limpiar el formulario después del registro exitoso
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
      // Manejar el caso en el que el tipoProductoSeleccionado no está definido o no tiene un ID
      this.mensajeError = 'Seleccione un tipo de producto válido';
      this.mensajeExito = '';
    }
  }

  formularioValido(): boolean {
    // Implementa tu lógica de validación según sea necesario
    return true;
  }
}
