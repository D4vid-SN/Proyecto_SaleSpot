import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { LogoutComponent } from './logout/logout.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroComponent } from './registro/registro.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { EditarComponent } from './editar/editar.component';
import { EliminarComponent } from './eliminar/eliminar.component';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';
import { ProductosComponent } from './productos/productos.component';
import { ConsultarProductoComponent } from './consultar-producto/consultar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './eliminar-producto/eliminar-producto.component';
import { VentasComponent } from './ventas/ventas.component';
import { RegistrarVentaComponent } from './registrar-ventas/registrar-ventas.component';
import { ListarVentasComponent } from './listar-ventas/listar-ventas.component';
import { RegistrarTipoProductoComponent } from './registrar-tipo-producto/registrar-tipo-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    LogoutComponent,
    UsuariosComponent,
    RegistroComponent,
    ConsultarComponent,
    EditarComponent,
    EliminarComponent,
    RegistrarProductoComponent,
    ProductosComponent,
    ConsultarProductoComponent,
    EditarProductoComponent,
    EliminarProductoComponent,
    VentasComponent,
    RegistrarVentaComponent,
    ListarVentasComponent,
    RegistrarTipoProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        // Configuración opcional de JwtModule si es necesario
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
