import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { Xuxemon } from "../../models/Xuxemon";
import { UsersService } from "../services/users.service";

@Component({
  selector: 'app-listaxuxemons-sincrud',
  templateUrl: './listaxuxemons-sincrud.component.html',
  styleUrls: ['./listaxuxemons-sincrud.component.css']
})
export class ListaxuxemonsSincrudComponent implements OnInit {

  currentPage: number = 1;
  pageSize: number = 6; // Mostrar solo 6 Xuxemons
  usersInPage: Xuxemon[] = [];
  allUsers: Xuxemon[] = [];

  userId: number;
  mostrarInventario: boolean = false;
  mostrarEditXuxemon: boolean = false;
  inventario: any;
  idXuxemon: number;

  selectedXuxemonName: string = '';

  xuxemonsDisponibles: any[]; 
  tamanosDisponibles: string[]; 
  mostrarXuxemonsDisponibles: boolean = false;

  tamanoXuxemon: string = '';

  
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

  alimentarXuxemonVisual(user: Xuxemon) {

    this.selectedXuxemonName = user.nombre;
    // Establecer mostrarInventario en true
    this.mostrarInventario = true;

    // Llamar al método getInventario() para actualizar el inventario
    this.userService.getInventario(this.userId)
      .subscribe(
        data => {
          if (data === null || data.length === 0) {
            console.warn('No se encontró inventario para este usuario.');
          } else {
            this.inventario = data;
          }
        },
        error => {
          console.log('Error al obtener el inventario:', error);
        }
      );
  
  }

  cerrarInventario() {
    this.mostrarInventario = false;
  }

  
  evitarCierre(event: MouseEvent) {
    event.stopPropagation(); // Evitar que el clic se propague al contenedor exterior
  }

  alimentarXuxemon(userId: number,xuxemonNombre: string, objeto: string) {
    this.userService.alimentarXuxemon(this.userId, this.selectedXuxemonName, objeto)
      .subscribe(
        response => {
          console.log('Caramelos comidos del Xuxemon incrementados:', response);
        },
        error => {
          alert(error);
          console.error('Error al incrementar los caramelos comidos del Xuxemon:', error);
        }
      );
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

  DesactivarXuxemon(userId: number, idXuxemon: number): void {
    this.userService.desactivarXuxemon(this.userId, idXuxemon)
      .subscribe(
        response => {
          console.log('Xuxemon desactivado correctamente');
          alert('Xuxemon desactivado correctamente');
        },
        error => {
          console.error('Error al desactivar el xuxemon:', error);
        }
      );
  }

  ActivarXuxemon(userId: number, idXuxemon: number): void {
    this.userService.activarXuxemon(this.userId, idXuxemon)
      .subscribe(
        response => {
          console.log('Xuxemon activado correctamente');
          alert('Xuxemon activado correctamente');
        },
        error => {
          console.error('Error al desactivar el xuxemon:', error);
          alert("No puedes tener más de 4 xuxemons activados");
        }
      );
  }

  

}


