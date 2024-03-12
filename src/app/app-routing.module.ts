import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from "./lista-usuarios/lista-usuarios.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';
import { CrearXuxemonComponent } from './crear-xuxemon/crear-xuxemon.component';
import { EditXuxemonComponent } from './edit-xuxemon/edit-xuxemon.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ListaxuxemonsSincrudComponent } from './listaxuxemons-sincrud/listaxuxemons-sincrud.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Redirige la ruta raíz al registro
  { path: 'register', component: RegisterComponent }, // Ruta de registro
  { path: 'login', component: LoginComponent }, // Ruta de login
  { path: 'menu', component: MenuComponent }, // Ruta para cualquier otro path no especificado
  { path: 'inventario', component: InventarioComponent }, // Agrega esta línea
  { path: 'xuxemons', component: ListaxuxemonsSincrudComponent }, // Agrega esta línea

  // Modifica la ruta 'lista-usuarios' para incluir rutas hijas
  { 
    path: 'lista-usuarios', component: ListaUsuariosComponent, // Componente padre
    children: [ 
      { path: 'crear-xuxemon', component: CrearXuxemonComponent }, // Ruta hija para crear
      { path: 'edit-xuxemon/:id', component: EditXuxemonComponent }, // Ruta hija para editar
    ] 
  },

  { path: '**', component: ErrorComponent } // Ruta para cualquier otro path no especificado
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//