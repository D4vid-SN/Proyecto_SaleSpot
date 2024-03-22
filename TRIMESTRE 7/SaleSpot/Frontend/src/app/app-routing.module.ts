import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components//login/login.component';
import { HomeComponent } from '../app/components//home/home.component';
import { MenuComponent } from '../app/components//menu/menu.component';
import { LogoutComponent } from '../app/components//logout/logout.component';
import { UsuariosComponent } from '../app/components//usuarios/usuarios.component';
import { RegistroComponent } from '../app/components//registro/registro.component';
import { ConsultarComponent } from '../app/components//consultar/consultar.component';
import { EditarComponent } from '../app/components//editar/editar.component';
import { EliminarComponent } from '../app/components//eliminar/eliminar.component';
import { RegistrarProductoComponent } from '../app/components//registrar-producto/registrar-producto.component';
import { ProductosComponent } from '../app/components//productos/productos.component';
import { ConsultarProductoComponent } from '../app/components//consultar-producto/consultar-producto.component';
import { EditarProductoComponent } from '../app/components//editar-producto/editar-producto.component';
import { EliminarProductoComponent } from '../app/components//eliminar-producto/eliminar-producto.component';
import { VentasComponent } from '../app/components//ventas/ventas.component';
import { RegistrarVentaComponent } from '../app/components//registrar-ventas/registrar-ventas.component';
import { ListarVentasComponent } from '../app/components//listar-ventas/listar-ventas.component';
import { RegistrarTipoProductoComponent } from '../app/components//registrar-tipo-producto/registrar-tipo-producto.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

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

