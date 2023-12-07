import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service'; // Reemplaza 'path-to-your-service' con la ruta correcta

@Component({
  selector: 'app-listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styleUrls: ['./listar-ventas.component.css']
})
export class ListarVentasComponent implements OnInit {
  ventas: any[] = [];

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.obtenerVentasConTipoProducto();
  }

  obtenerVentasConTipoProducto(): void {
    // Obtener todas las ventas
    this.backendService.obtenerVentas().subscribe(
      (ventas: any[]) => {
        // Para cada venta, obtener el nombre del tipo de producto
        ventas.forEach(venta => {
          this.backendService.obtenerTipoProductoPorId(venta.id_tipo_prod).subscribe(
            (tipoProducto: any) => {
              // Asignar el nombre del tipo de producto a la venta
              venta.tipoProductoNombre = tipoProducto ? tipoProducto.tipo_prod : 'Desconocido';
            },
            (error) => {
              console.error('Error al obtener el tipo de producto:', error);
            }
          );
        });

        // Asignar las ventas con nombres de tipo de producto al arreglo
        this.ventas = ventas;
      },
      (error) => {
        console.error('Error al obtener las ventas:', error);
      }
    );
  }
}