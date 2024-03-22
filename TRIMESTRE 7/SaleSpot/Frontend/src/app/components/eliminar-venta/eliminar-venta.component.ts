import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-venta',
  templateUrl: './eliminar-venta.component.html',
  styleUrls: ['./eliminar-venta.component.css']
})
export class EliminarVentaComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
