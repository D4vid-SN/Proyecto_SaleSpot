import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { CollapseModule } from 'ngx-bootstrap/collapse';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/components/login/login.component';
import { HomeComponent } from '../app/components/home/home.component';
import { MenuComponent } from '../app/components/menu/menu.component';
import { LogoutComponent } from '../app/components/logout/logout.component';
import { UsuariosComponent } from '../app/components/usuarios/usuarios.component';
import { RegistroComponent } from '../app/components/registro/registro.component';
import { ConsultarComponent } from '../app/components/consultar/consultar.component';
import { EditarComponent } from '../app/components/editar/editar.component';
import { EliminarComponent } from '../app/components/eliminar/eliminar.component';
import { RegistrarProductoComponent } from '../app/components/registrar-producto/registrar-producto.component';
import { ProductosComponent } from '../app/components/productos/productos.component';
import { ConsultarProductoComponent } from '../app/components/consultar-producto/consultar-producto.component';
import { EditarProductoComponent } from '../app/components/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from '../app/components/eliminar-producto/eliminar-producto.component';
import { VentasComponent } from '../app/components/ventas/ventas.component';
import { RegistrarVentaComponent } from '../app/components/registrar-ventas/registrar-ventas.component';
import { ListarVentasComponent } from '../app/components/listar-ventas/listar-ventas.component';
import { RegistrarTipoProductoComponent } from '../app/components/registrar-tipo-producto/registrar-tipo-producto.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
    RegistrarTipoProductoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CollapseModule.forRoot(),
    JwtModule.forRoot({
      config: {
        // Configuración opcional de JwtModule si es necesario
      }
    })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
