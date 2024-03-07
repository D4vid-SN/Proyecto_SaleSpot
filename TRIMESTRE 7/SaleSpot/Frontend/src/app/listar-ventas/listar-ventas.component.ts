// listar-ventas.component.ts

import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styleUrls: ['./listar-ventas.component.css']
})
export class ListarVentasComponent implements OnInit {
  ventas: any[] = [];

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.obtenerVentasConProducto();
  }

  obtenerVentasConProducto(): void {
    // Obtener todas las ventas
    this.backendService.obtenerVentas().subscribe(
      (ventas: any[]) => {
        // Para cada venta, obtener la información del producto
        ventas.forEach(venta => {
          this.backendService.obtenerProductoPorId(venta.id_prod).subscribe(
            (producto: any) => {
              // Asignar directamente el nombre del producto a la propiedad productoNombre
              venta.productoNombre = producto ? producto.desc_prod : 'Desconocido';
            },
            (error) => {
              console.error('Error al obtener el producto:', error);
            }
          );
        });

        // Asignar las ventas con nombres de productos al arreglo
        this.ventas = ventas;
      },
      (error) => {
        console.error('Error al obtener las ventas:', error);
      }
    );
  }

  borrarVenta(nVenta: number) {
    // Lógica para borrar la venta con el número de venta nVenta
    // Debes implementar esta lógica en tu servicio y manejar la actualización de la lista de ventas
    this.backendService.borrarVenta(nVenta).subscribe(
      (response) => {
        console.log('Venta borrada con éxito', response);
        // Eliminar la venta de la lista local
        this.ventas = this.ventas.filter(venta => venta.n_venta !== nVenta);
      },
      (error) => {
        console.error('Error al borrar la venta', error);
      }
    );
  }
}

