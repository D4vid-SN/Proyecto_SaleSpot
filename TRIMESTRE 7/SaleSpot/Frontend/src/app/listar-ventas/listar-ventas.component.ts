import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

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
  
  GenerarReporte() {
    const element = document.getElementById('ventas');
    const docName = 'Reporte_de_ventas';

    if (element) {
        const ventas: any[] = [];
        const ventasElements = element.querySelectorAll('.col-md-3');

        ventasElements.forEach(ventaElement => {
            const venta: any = {};

            venta.n_venta = ventaElement.querySelector('h4')?.textContent?.split('#')[1] || '';
            venta.fecha_venta = ventaElement.querySelector('h5')?.textContent?.split(':')[1]?.trim() || '';
            venta.subtotal = ventaElement.querySelectorAll('p')[0]?.textContent?.split(':')[1]?.trim() || '';
            venta.iva = ventaElement.querySelectorAll('p')[1]?.textContent?.split(':')[1]?.trim() || '';
            venta.total_venta = ventaElement.querySelectorAll('p')[2]?.textContent?.split(':')[1]?.trim() || '';
            venta.productoNombre = ventaElement.querySelectorAll('p')[3]?.textContent?.split(':')[1]?.trim() || 'Desconocido';
            venta.cant_prod = ventaElement.querySelectorAll('p')[4]?.textContent?.split(':')[1]?.trim() || '';

            ventas.push(venta);
        });

        const columns = [
            { header: 'Venta', dataKey: 'n_venta' },
            { header: 'Fecha', dataKey: 'fecha_venta' },
            { header: 'Subtotal', dataKey: 'subtotal' },
            { header: 'IVA', dataKey: 'iva' },
            { header: 'Total', dataKey: 'total_venta' },
            { header: 'Producto', dataKey: 'productoNombre' },
            { header: 'Cantidad de Productos', dataKey: 'cant_prod' }
        ];

        const doc = new jsPDF();

        // Añadir imagen al documento centrada
        const imgSrc = '../assets/images/logo.png';
        const x = (doc.internal.pageSize.getWidth() - 50) / 2; // Ajusta el ancho de la imagen según sea necesario
        const y = 10;
        doc.addImage(imgSrc, 'PNG', x, y, 50, 50); // Ajusta el ancho y alto de la imagen según sea necesario

        // Agregar encabezado al documento con datos del archivo
        const header = 'Reporte de Ventas';
        const fecha = new Date().toLocaleDateString();
        const metadata = `Fecha: ${fecha}\nNombre del archivo: ${docName}`;

        // Dar formato al encabezado
        doc.setFontSize(16);
        doc.setFont('bold');
        doc.text(header, doc.internal.pageSize.getWidth() / 2, 65, { align: 'center' });

        // Añadir línea divisoria entre el encabezado y la metadata
        doc.setLineWidth(0.5);
        doc.line(10, 80, doc.internal.pageSize.getWidth() - 10, 80);

        // Dar formato a la metadata
        doc.setFont('normal');
        doc.setFontSize(12);
        doc.text(metadata, 14, 85);

        // Añadir estilos a la tabla generada en el reporte
        autoTable(doc, {
            head: [columns.map(column => column.header)],
            body: ventas.map(venta => columns.map(column => venta[column.dataKey])),
            startY: 100, // Ajusta la posición vertical de la tabla
            styles: { fontSize: 10, cellPadding: 3, valign: 'middle' }, // Estilos de la tabla
            columnStyles: { 0: { cellWidth: 20 }, 1: { cellWidth: 25 } } // Estilos de las columnas
        });

        // Añadir borde alrededor de todo el documento
        doc.setLineWidth(1);
        doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10);

        doc.save(`${docName}_${fecha}.pdf`);
    } else {
        console.error('Elemento con id "ventas" no encontrado.');
    }
  }
}

