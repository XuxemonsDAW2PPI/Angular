import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.css']
})
export class DiscordComponent implements OnInit {

  tagBusqueda: string = '';
  amigoEncontrado: string = '';
  userId: number;
  solicitudesAmistad: any[] = [];
  listaAmigos: any[] = [];
  userTag: any;

  constructor(private route: ActivatedRoute, private userService: UsersService) {}


  ngOnInit(): void {
    this.getUserIdFromUrl();
    this.obtenerSolicitudesAmistad();
    this.obtenerListaAmigos();
    this.obtenerTagUsuario()
  }


  getUserIdFromUrl() {
    this.route.paramMap.subscribe(params => {
      if (params !== null) {
        const userIdParam = params.get('userId');
        if (userIdParam !== null) {
          this.userId = +userIdParam;
        } else {
          console.error('ID de usuario no encontrada en la URL');
        }
      }
    });
  }

  buscarAmigo(): void {
    if (this.tagBusqueda.trim() !== '') {
      const tagCodificado = encodeURIComponent(this.tagBusqueda); 
      this.userService.buscarAmigo(this.userId, tagCodificado) 
        .subscribe(
          data => {
            if (data.tags && data.tags.length > 0) {
              console.log('Usuario encontrado:', data.tags[0]); // Accede al primer elemento del array "tags"
              this.amigoEncontrado = data.tags[0]; // Asigna el tag encontrado
            } else {
              console.error('Este es tu propio usertag, introduce otro');
              alert('Este es tu propio usertag, introduce otro')
            }
          },
          error => {
            console.error('Error al buscar amigo:', error);
          }
        );
    } else {
      this.amigoEncontrado = ''; 
    }
  }

  enviarSolicitud(tagAmigo: string): void {
      this.userService.enviarSolicitudAmigo(this.userId, tagAmigo)
        .subscribe(
          (response: any) => {
            console.log('Solicitud enviada correctamente:', response);
            alert('Solicitud de amistad enviada correctamente')
          },
          error => {
            console.error('Error al enviar solicitud:', error);
            alert('Ya existe una solicitud pendiente entre este usuario y tu')
          }
        );
  

        }
  
        obtenerSolicitudesAmistad(): void {
          this.userService.obtenerSolicitudesAmistad(this.userId)
            .subscribe(
              (data: any) => {
                console.log('Solicitudes de amistad:', data);
                this.solicitudesAmistad = data; 
              },
              error => {
                console.error('Error al obtener las solicitudes de amistad:', error);
              }
            );
        }

        obtenerListaAmigos(): void {
          this.userService.listaAmigos(this.userId)
            .subscribe(
              (data: any) => {
                console.log('Lista de amigos obtenido:', data);
                this.listaAmigos = data; 
              },
              error => {
                console.error('Error al obtener la lista de amigos:', error);
              }
            );
        }

        aceptarSolicitud(userId: number, tagAmigo: string): void {
          this.userService.aceptarSolicitud(this.userId, tagAmigo)
            .subscribe(
              (response: any) => {
                console.log('Solicitud aceptada:', response);
              },
              error => {
                console.error('Error al aceptar la solicitud:', error);
              }
            );
        }

        denegarSolicitud(userId: number, tagAmigo: string): void {
          this.userService.denegarSolicitud(this.userId, tagAmigo)
            .subscribe(
              (response: any) => {
                console.log('Solicitud denegada:', response);
              },
              error => {
                console.error('Error al denegar la solicitud:', error);
              }
            );
        }
  
        obtenerTagUsuario(): void {
          this.userService.obtenerTagUsuario(this.userId)
            .subscribe(
              data => {
                this.userTag = data.tag;
              },
              error => {
                console.error('Error al obtener el tag del usuario:', error);
              }
            );
        }
        
  

}
