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
    this.obtenerVentas();
  }

  obtenerVentas(): void {
    this.backendService.obtenerVentas().subscribe(
      (ventas: any[]) => {
        this.ventas = ventas;
      },
      (error) => {
        console.error('Error al obtener las ventas:', error);
      }
    );
  }
}
