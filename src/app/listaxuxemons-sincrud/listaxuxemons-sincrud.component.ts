import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.userService.loadUsers()
      .subscribe(data => {
        this.allUsers = data;
        this.generateRandomUsers();
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
  
  

}

