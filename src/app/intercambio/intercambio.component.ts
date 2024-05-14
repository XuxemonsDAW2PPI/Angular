import { Component } from '@angular/core';
import { Xuxemon } from 'src/models/Xuxemon';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intercambio',
  templateUrl: './intercambio.component.html',
  styleUrls: ['./intercambio.component.css']
})
export class IntercambioComponent {
  
  currentPage: number = 1;
  pageSize: number = 6; 
  usersInPage: Xuxemon[] = [];
  allUsers: Xuxemon[] = [];

  userId: number;
  mostrarListadeAmigos: boolean = false;
  mostrarEditXuxemon: boolean = false;
  idXuxemon: number;

  mostrarListaXuxemons: boolean = false;

  selectedXuxemonName: string = '';

  xuxemonsDisponibles: any[]; 
  tamanosDisponibles: string[]; 
  mostrarXuxemonsDisponibles: boolean = false;

  tamanoXuxemon: string = '';
  listaAmigos: any;
  userTag: any;
user: any;

selectedUser: Xuxemon;
solicitudesPendientes: any[];
solicitudesRecibidas: any[];
selectedSolicitud: any;

  
  constructor(private userService: UsersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUsers();
    this.route.paramMap.subscribe(params => {
      const userIdParam = params.get('userId');
      if (userIdParam !== null) {
        this.userId = +userIdParam;
        this.listarSolicitudesPendientes();
        this.Solicitudesrecibidas();
      }
    });
  }
  
  
  loadUsers(): void {
    this.userService.loadUsers()
      .subscribe(data => {
        this.allUsers = data;
        this.getXuxemonsDelUser(this.userId);
      }, error => {
        console.error('Error al cargar los usuarios desde la API:', error);
      });
  }

  updateUsersBasedOnPage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.usersInPage = this.allUsers.slice(startIndex, endIndex);
  }

  Intercambiovisual(user: Xuxemon) {
    this.selectedUser = user;
    this.selectedXuxemonName = user.nombre;
    this.mostrarListadeAmigos = true;
  
    this.userService.listaAmigos(this.userId)
      .subscribe(
        (data: any) => {
          console.log('Lista de amigos obtenido:', data);
          this.listaAmigos = data; 
          this.obtenerTagUsuario();
        },
        error => {
          console.error('Error al obtener la lista de amigos:', error);
        }
      );
  }
  

  evitarCierre(event: MouseEvent) {
    event.stopPropagation(); // Evitar que el clic se propague al contenedor exterior
  }

  cerrarListaAmigos() {
    this.mostrarListadeAmigos = false;
  }

  calculateProgressBarWidth(tamano: string): string {
    switch (tamano) {
      case 'Pequeño':
        return '30%'; 
      case 'Mediano':
        return '50%'; 
      case 'Grande':
        return '100%'; 
      default:
        return '0%'; 
    }
  }

  getSize(tamano: string): string {
    switch (tamano) {
      case 'Pequeño':
        return '75px'; // Tamaño inicial
      case 'Mediano':
        return '125px'; // Tamaño mediano
      case 'Grande':
        return '200px'; // Tamaño grande
      default:
        return '75px'; // Tamaño por defecto
    }
  }


  getXuxemonsDelUser(userId: number): void {
    this.userService.getXuxemonsDelUser(userId)
      .subscribe(data => {
        const userXuxemons = data;
        this.usersInPage = [...userXuxemons, ...this.usersInPage];
      }, error => {
        console.error('Error al obtener los xuxemons del usuario:', error);
      });
  }

  getClassPorEstado(status: string): string {
    return status === 'Activo' ? 'user-card-active' : 'user-card';
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

  iniciarIntercambioConAmigo(amigo: any) {
    const idUsuario1 = this.userId;
    const tagUsuario1 = encodeURIComponent(this.userTag); 
    const nombreXuxemon1 = this.selectedXuxemonName;
    const tipo1 = this.selectedUser.tipo; 
    const tamanoXuxemon1 = this.selectedUser.tamano; 
    const caramelosComidosXuxemon1 = this.selectedUser.caramelos_comidos; 
    const idUsuario2 = amigo.id; 
    const tagUsuario2 = encodeURIComponent(amigo.nombre); 
  
    this.userService.registrarSolicitudIntercambio(idUsuario1, tagUsuario1, nombreXuxemon1, tipo1, tamanoXuxemon1, caramelosComidosXuxemon1, idUsuario2, tagUsuario2)
      .subscribe(
        (response: any) => {
          console.log('Solicitud de intercambio iniciado con éxito:', response);
          alert('Se ha mandado la petición de intercambio al usuario seleccionado');
        },
        error => {
          console.error('Error al iniciar el solicitud de intercambio:', error);
          alert('Hubo un error al mandar la petición');
        }
      );
    }


    listarSolicitudesPendientes() {
      this.userService.listarSolicitudesPendientes(this.userId).subscribe(
        (data) => {
          this.solicitudesPendientes = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }

    Solicitudesrecibidas() {
      this.userService.Solicitudesrecibidas(this.userId).subscribe(
        (data) => {
          this.solicitudesRecibidas = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
    

    aceptarIntercambioVisual(solicitudr: any): void {
      this.selectedSolicitud = solicitudr;
      this.mostrarListaXuxemons = true;
    }

    cerrarListaXuxemons(): void {
      this.mostrarListaXuxemons = false;
      this.selectedSolicitud = null;
    }

    denegarIntercambio(idUsuario: number, idIntercambio: number): void {
      this.userService.DenegarIntercambio(this.userId, idIntercambio).subscribe(
        () => {
          console.log('Intercambio denegado exitosamente');
          alert('Solicitud de intercambio cancelada')
        },
        error => {
          console.error('Error al denegar el intercambio:', error);
          alert('No se pudo cancelar la solicitud de intercambio')
        }
      );
    }


    aceptarIntercambio(user: any): void {
      const datos = {
        nombre_xuxemon2: user.nombre,
        tipo2: user.tipo,
        tamano_xuxemon2: user.tamano,
        caramelos_comidosx2: user.caramelos_comidos
      };
  
      this.userService.aceptarSolicitudIntercambio(this.userId, datos).subscribe(response => {
        console.log('Solicitud aceptada', response);
        alert('Petición confirmada con éxito, esperando al otro usuario...');
        this.mostrarListaXuxemons = false;
        this.selectedSolicitud = null;
        this.Solicitudesrecibidas();
      }, error => {
        console.error('Error al aceptar la solicitud', error);
      });
    }
}