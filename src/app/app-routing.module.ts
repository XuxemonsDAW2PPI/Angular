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
import { XuxedexComponent } from './xuxedex/xuxedex.component';
import { DiscordComponent } from './amigos/discord/discord.component';
import { HospitalComponent } from './hospital/hospital.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, 
  { path: 'amigos', component: DiscordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'menu/:userId', component: MenuComponent }, 
  { path: 'inventario/:userId', component: InventarioComponent }, 
  { path: 'hospital/:userId', component: HospitalComponent }, 
  { path: 'xuxemons/:userId', component: ListaxuxemonsSincrudComponent },
  { path: 'xuxedex', component: XuxedexComponent },

  { 
    path: 'lista-usuarios', component: ListaUsuariosComponent, 
    children: [ 
      { path: 'crear-xuxemon', component: CrearXuxemonComponent }, 
      { path: 'edit-xuxemon/:id', component: EditXuxemonComponent },
    ] 
  },

  { path: '**', component: ErrorComponent } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//