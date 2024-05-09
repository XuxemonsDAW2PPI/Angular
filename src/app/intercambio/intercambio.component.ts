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

  selectedXuxemonName: string = '';

  xuxemonsDisponibles: any[]; 
  tamanosDisponibles: string[]; 
  mostrarXuxemonsDisponibles: boolean = false;

  tamanoXuxemon: string = '';
  listaAmigos: any;

  
  constructor(private userService: UsersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUsers();
    this.route.paramMap.subscribe(params => {
      const userIdParam = params.get('userId');
      if (userIdParam !== null) {
        this.userId = +userIdParam;
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

    this.selectedXuxemonName = user.nombre;
    this.mostrarListadeAmigos = true;

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




}