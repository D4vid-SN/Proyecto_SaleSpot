import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  id_prod: number = 0;
  producto: any = {
    desc_prod: '',
    tipo_prod: '',
    valor_prod: null,
    estado_prod: true 
  };
  tiposProducto: any[] = [];
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

    // Obtener tipos de producto al inicializar el componente
    this.obtenerTiposProducto();

    // Cargar los datos del producto a editar
    this.cargarProducto();
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

  cargarProducto() {
    // Llamar a tu servicio para obtener los datos del producto por su ID
    this.backendService.obtenerProductoPorId(this.id_prod).subscribe(
      (response: any) => {
        // Cargar los datos del producto
        this.producto = response;
  
        // Convertir el estado_prod a booleano si es necesario
        this.producto.estado_prod = !!this.producto.estado_prod;
      },
      (error) => {
        console.error('Error al obtener datos del producto', error);
      }
    );
  }
  

  actualizarProducto() {
    // Llamar a tu servicio para actualizar el producto con los datos actuales
    this.backendService.actualizarProducto(this.id_prod, this.producto).subscribe(
      (response) => {
        this.mensajeExito = 'Producto actualizado con éxito';
      },
      (error) => {
        this.mensajeError = 'Error al actualizar el producto';
      }
    );
  }

  formularioCompleto(): boolean {
    return (
      this.producto.desc_prod !== '' &&
      this.producto.tipo_prod !== '' &&
      this.producto.valor_prod !== null &&
      typeof this.producto.estado_prod === 'boolean'
    );
  }
}


