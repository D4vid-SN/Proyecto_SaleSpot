import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {
  id_prod: number = 0;
  producto: any = {
    desc_prod: '',
    tipo_prod: '',
    valor_prod: null,
    estado_prod: true // Valor predeterminado, puedes cambiarlo según tus necesidades
  };
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del producto desde la URL
    this.id_prod = this.route.snapshot.params['id_prod'];

    // Cargar los datos del producto a eliminar
    this.cargarProducto();
  }

  cargarProducto() {
    // Llamar a tu servicio para obtener los datos del producto por su ID
    this.backendService.obtenerProductoPorId(this.id_prod).subscribe(
      (response: any) => {
        this.producto = response;
      },
      (error) => {
        console.error('Error al obtener datos del producto', error);
      }
    );
  }

  eliminarProducto() {
    // Llamar a tu servicio para eliminar el producto por su ID
    this.backendService.eliminarProducto(this.id_prod).subscribe(
      (response) => {
        // Una vez se haya eliminado con éxito, redirecciona a la vista de todos los productos
        this.router.navigate(['/consultarProducto']);
      },
      (error) => {
        this.mensajeError = 'Error al eliminar el producto';
      }
    );
  }
}
