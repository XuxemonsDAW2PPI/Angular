import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from "./lista-usuarios/lista-usuarios.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Redirige la ruta raíz al registro
  { path: 'register', component: RegisterComponent }, // Ruta de registro
  { path: 'login', component: LoginComponent }, // Ruta de login
  { path: 'menu', component: MenuComponent }, // Ruta para cualquier otro path no especificado

  { path: 'lista-usuarios', component: ListaUsuariosComponent }, // Ruta de lista de usuarios
  
  { path: '**', component: ErrorComponent } // Ruta para cualquier otro path no especificado
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
