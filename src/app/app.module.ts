import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
// Components
import {ListaUsuariosComponent} from './lista-usuarios/lista-usuarios.component';

// Angular Material
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { EditXuxemonComponent } from './edit-xuxemon/edit-xuxemon.component';
import { CrearXuxemonComponent } from './crear-xuxemon/crear-xuxemon.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ListaxuxemonsSincrudComponent } from './listaxuxemons-sincrud/listaxuxemons-sincrud.component';
import { XuxedexComponent } from './xuxedex/xuxedex.component';
import { DiscordComponent } from './amigos/discord/discord.component';
import { HospitalComponent } from './hospital/hospital.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    LoginComponent,
    ErrorComponent,
    RegisterComponent,
    MenuComponent,
    EditXuxemonComponent,
    CrearXuxemonComponent,
    InventarioComponent,
    ListaxuxemonsSincrudComponent,
    XuxedexComponent,
    DiscordComponent,
    HospitalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    

    // Angular Material
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,DiscordComponent]
})
export class AppModule {
}
