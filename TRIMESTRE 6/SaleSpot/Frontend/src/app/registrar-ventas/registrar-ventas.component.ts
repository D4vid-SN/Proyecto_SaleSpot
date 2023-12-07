import { Component } from '@angular/core';
import { BackendService } from '../backend.service'; // Ajusta la ruta según la estructura de tu proyecto

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-ventas.component.html',
  styleUrls: ['./registrar-ventas.component.css']
})
export class RegistrarVentaComponent {

  productos: any[] = [];
  tipoProductoSeleccionado: any;

  nuevaVenta: any = {};  // Objeto para almacenar los datos del formulario
  tiposDocumento: any[] = [];  // Asegúrate de tener un array de tipos de documento disponible
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private backendService: BackendService) { }  // Inyecta tu servicio API en el constructor

    ngOnInit() {
    this.backendService.obtenerProductos().subscribe(
      (response: any[]) => {
        this.productos = response;
        // Para cada producto, obtener la descripción del tipo de producto
        this.productos.forEach(producto => {
          this.backendService.obtenerTipoProductoPorId(producto.tipo_prod).subscribe(
            (tipoProductoResponse: any) => {
              // Asignar la descripción del tipo de producto al producto
              producto.tipo_prod = tipoProductoResponse.desc_tipo_prod;
            },
            error => {
              console.error('Error al obtener la descripción del tipo de producto', error);
            }
          );
        });
      },
      error => {
        console.error('Error al obtener la lista de productos', error);
      }
    );

    this.obtenerTiposDocumento();
  }

  cargarDescripcionTipoProducto(event: any) {
    const selectedProductId = event.target.value;
  
    // Buscar el tipo de producto por ID en la lista de productos
    const selectedProduct = this.productos.find(producto => producto.tipo_prod === selectedProductId);
  
    if (selectedProduct) {
      // Si el producto seleccionado se encuentra, cargar su descripción
      this.backendService.obtenerTipoProductoPorId(selectedProduct.tipo_prod).subscribe(
        (tipoProductoResponse: any) => {
          // Asignar la descripción del tipo de producto al producto seleccionado
          selectedProduct.tipo_prod = tipoProductoResponse.desc_tipo_prod;
          this.tipoProductoSeleccionado = selectedProduct; // Actualizar el tipoProductoSeleccionado
          this.nuevaVenta.id_prod = selectedProductId; // Asignar el ID del producto a la propiedad nuevaVenta
        },
        error => {
          console.error('Error al obtener la descripción del tipo de producto', error);
        }
      );
    }
  }
  

  seleccionarTipoProducto(event: any) {
    const selectedProductId = event.target.value;
    // Buscar el tipo de producto por ID en la lista de productos
    this.tipoProductoSeleccionado = this.productos.find(producto => producto.tipo_prod === selectedProductId);
    this.nuevaVenta.id_prod = selectedProductId; // Asignar el ID del producto a la propiedad nuevaVenta
  }

  

  registrarVenta() {
    // Verificar que el tipoProductoSeleccionado está definido y tiene un ID
    if (this.tipoProductoSeleccionado && this.tipoProductoSeleccionado.tipo_prod) {
      // Asignar el ID del producto al objeto nuevaVenta
      this.nuevaVenta.id_prod = this.tipoProductoSeleccionado.tipo_prod;
  
      // Enviar la solicitud al backend
      this.backendService.registrarVenta(this.nuevaVenta)
        .subscribe(
          (response) => {
            this.mensajeExito = response.message;
            this.mensajeError = '';
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
    // Aquí puedes implementar lógica de validación personalizada si es necesario
    return true;
  }

  obtenerTiposDocumento() {
    // Llama al método del servicio BackendService para obtener los tipos de documento
    this.backendService.obtenerTiposDocumento().subscribe(
      (response: any[]) => {
        this.tiposDocumento = response; // Almacena la lista de tipos de documento
      },
      (error) => {
        console.error('Error al obtener tipos de documento', error);
      }
    );
  }
}

