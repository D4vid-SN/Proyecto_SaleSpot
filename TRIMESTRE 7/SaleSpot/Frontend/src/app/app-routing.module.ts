import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent},
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'registrar', component: RegistroComponent, canActivate: [AdminGuard] },
  { path: 'consultar', component: ConsultarComponent, canActivate: [AdminGuard] },
  { path: 'editar/:tdoc_user/:id_user', component: EditarComponent, canActivate: [AdminGuard] },
  { path: 'eliminar/:tdoc_user/:id_user', component: EliminarComponent, canActivate: [AdminGuard] },
  { path: 'registrarProducto', component: RegistrarProductoComponent, canActivate: [AuthGuard] },
  { path: 'consultarProducto', component: ConsultarProductoComponent, canActivate: [AuthGuard] },
  { path: 'editarProducto/:id_prod', component: EditarProductoComponent, canActivate: [AuthGuard] },
  { path: 'eliminarProducto/:id_prod', component: EliminarProductoComponent, canActivate: [AuthGuard] },
  { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard] },
  { path: 'registrar/ventas', component: RegistrarVentaComponent, canActivate: [AuthGuard] },
  { path: 'listar/ventas', component: ListarVentasComponent, canActivate: [AuthGuard] },
  { path: 'registrar/tipo/producto', component: RegistrarTipoProductoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Ruta predeterminada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

