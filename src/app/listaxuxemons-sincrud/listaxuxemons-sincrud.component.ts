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
  inventario: any;

  
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
        this.generateRandomUsers();
        this.getXuxemonsDelUser(this.userId);
      }, error => {
        console.error('Error al cargar los usuarios desde la API:', error);
      });
  }

  generateRandomUsers() {
    this.usersInPage = [];
    for (let i = 0; i < this.pageSize; i++) {
      const randomIndex = Math.floor(Math.random() * this.allUsers.length);
      const randomUser = this.allUsers[randomIndex];
      for (let j = 0; j < 3; j++) { 
        const clonedUser = { ...randomUser }; 
        this.usersInPage.push(clonedUser);
      }
    }
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

  alimentarXuxemon(user: Xuxemon) {

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
    
    if (!user.caramelos) {
      user.caramelos = 0;
    }
    
    // Incrementar el contador de caramelos
    user.caramelos += 1;
  
    // Actualizar el tamaño del xuxemon
    if (user.tamano === 'Pequeño' && user.caramelos >= 3) {
      user.tamano = 'Mediano';
      user.caramelos = 0; // Reiniciar el contador de caramelos
    } else if (user.tamano === 'Mediano' && user.caramelos >= 5) {
      user.tamano = 'Grande';
      user.caramelos = 0; // Reiniciar el contador de caramelos
      user.maxLevelReached = true;
    }
  }

  cerrarInventario() {
    this.mostrarInventario = false;
  }
  
  evitarCierre(event: MouseEvent) {
    event.stopPropagation(); // Evitar que el clic se propague al contenedor exterior
  }

  disminuirCantidad(objeto: string) {
    this.userService.disminuirCantidadObjeto(this.userId, objeto)
      .subscribe(
        response => {
          console.log('Cantidad de ' + objeto + ' disminuida en 1 unidad');
          
        },
        error => {
          console.error('Error al disminuir la cantidad de ' + objeto + ':', error);
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
  
}


