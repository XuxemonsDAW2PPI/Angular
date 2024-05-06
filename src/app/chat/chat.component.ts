import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

interface Mensaje {
  contenido: string;
  fecha: Date;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userId: number = 1;
  listaAmigos: any[] = [
    { id: 2, nombre: 'Amigo 1' },
    { id: 3, nombre: 'Amigo 2' },
    { id: 4, nombre: 'Amigo 3' }
  ];
  amigosConMensajes: { [amigoId: number]: Mensaje[] } = {
    2: [],
    3: [],
    4: []
  };

  amigoSeleccionado: number = 2;
  amigoSeleccionadoNombre: string = this.listaAmigos[0].nombre;
  mensajesActuales: Mensaje[] = this.amigosConMensajes[this.amigoSeleccionado];
  mensajeNuevo: string = '';

  constructor(private route: ActivatedRoute, private userService: UsersService) {}

  ngOnInit(): void {}

  mostrarMensajes(amigoId: number): void {
    this.amigoSeleccionado = amigoId;
    this.amigoSeleccionadoNombre = this.listaAmigos.find(amigo => amigo.id === amigoId)?.nombre || '';
    this.mensajesActuales = this.amigosConMensajes[this.amigoSeleccionado];
  }

  enviarMensaje(): void {
    const mensaje: Mensaje = {
      contenido: this.mensajeNuevo,
      fecha: new Date()
    };
    this.amigosConMensajes[this.amigoSeleccionado].push(mensaje);
    this.mensajeNuevo = '';
  }
}
