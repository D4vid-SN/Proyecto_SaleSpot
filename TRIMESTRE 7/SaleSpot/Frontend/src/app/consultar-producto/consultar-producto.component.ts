import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-consultar-producto',
  templateUrl: './consultar-producto.component.html',
  styleUrls: ['./consultar-producto.component.css']
})
export class ConsultarProductoComponent implements OnInit {
  productos: any[] = [];

  constructor(private backendService: BackendService) {}

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
}


