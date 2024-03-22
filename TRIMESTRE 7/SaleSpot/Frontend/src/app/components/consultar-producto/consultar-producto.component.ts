import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackendService } from '../../services/backend.service';
import { EliminarProductoComponent } from '../eliminar-producto/eliminar-producto.component';// Asegúrate de importar el componente EliminarProductoComponent correctamente

@Component({
  selector: 'app-consultar-producto',
  templateUrl: './consultar-producto.component.html',
  styleUrls: ['./consultar-producto.component.css']
})
export class ConsultarProductoComponent implements OnInit {
  productos: any[] = [];

  constructor(private backendService: BackendService, public dialog: MatDialog) {}

  ngOnInit(): void {
    // Obtener la lista de productos
    this.backendService.obtenerProductos().subscribe(
      (response: any[]) => {
        this.productos = response;
        // Para cada producto, obtener la descripción del tipo de producto
        this.productos.forEach(producto => {
          this.backendService.obtenerTipoProductoPorId(producto.tipo_prod).subscribe(
            (tipoProductoResponse: any) => {
              // Asignar la descripción del tipo de producto al producto
              producto.tipo_prod = tipoProductoResponse.tipo_prod;
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
  }

  openConfirmationDialog(idProducto: number): void {
    const dialogRef = this.dialog.open(EliminarProductoComponent, {
      width: '350px',
      data: { message: '¿Estás seguro de que quieres borrar este producto?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarProducto(idProducto);
      }
    });
  }

  eliminarProducto(idProducto: number) {
    // Llamar a tu servicio para eliminar el producto por su ID
    this.backendService.eliminarProducto(idProducto).subscribe(
      (response) => {
        // Una vez se haya eliminado con éxito, redirecciona a la vista de todos los productos
        // Aquí necesitarás implementar la lógica de redireccionamiento adecuada si es necesario
        console.log('Producto eliminado con éxito');
      },
      (error) => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }
}


