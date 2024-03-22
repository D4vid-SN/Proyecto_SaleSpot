import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent {
  // id_prod: number = 0;
  // producto: any = {
  //   desc_prod: '',
  //   tipo_prod: '',
  //   valor_prod: null,
  //   estado_prod: true // Valor predeterminado, puedes cambiarlo según tus necesidades
  // };
  // mensajeExito: string = '';
  // mensajeError: string = '';

  constructor(
    public dialogRef: MatDialogRef<EliminarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  // ngOnInit(): void {
  //   // Obtener el ID del producto desde la URL
  //   this.id_prod = this.route.snapshot.params['id_prod'];

  //   // Cargar los datos del producto a eliminar
  //   this.cargarProducto();
  // }

  // cargarProducto() {
  //   // Llamar a tu servicio para obtener los datos del producto por su ID
  //   this.backendService.obtenerProductoPorId(this.id_prod).subscribe(
  //     (response: any) => {
  //       this.producto = response;
  //     },
  //     (error) => {
  //       console.error('Error al obtener datos del producto', error);
  //     }
  //   );
  // }
}
