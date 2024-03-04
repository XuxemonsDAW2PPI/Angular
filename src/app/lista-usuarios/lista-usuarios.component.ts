import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Xuxemon } from "../../models/Xuxemon";
import { UsersService } from "../services/users.service";

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  mostrarEditXuxemon: boolean = false;
  mostrarCrearXuxemon: boolean = false;
  xuxemonSeleccionado: any; // Puedes cambiar esto según tu implementación

  editarXuxemon(user: any): void {
    this.xuxemonSeleccionado = user;
    this.mostrarEditXuxemon = !this.mostrarEditXuxemon;
  }

  crearXuxemon(): void {
    this.mostrarCrearXuxemon = !this.mostrarCrearXuxemon
  }

  currentPage: number = 1;
  pageSize: number = 48; // Ajusta según la necesidad de mostrar filas de 6
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
        this.usersInPage = data;
        console.log(this.allUsers);
        // Aquí puedes llamar a cualquier método adicional para procesar los datos, si es necesario
      }, error => {
        console.error('Error al cargar los usuarios desde la API:', error);
      });
  }

  updateUsersBasedOnPage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.usersInPage = this.allUsers.slice(startIndex, endIndex);
  }

  eliminarXuxemon(user: any): void {
    this.userService.eliminarXuxemon(user.id).subscribe(
      response => {
        console.log('Xuxemon eliminado correctamente:', response);
        this.loadUsers();
        // Aquí puedes agregar lógica adicional, como volver a cargar la lista de usuarios
      },
      error => {
        console.error('Error al eliminar el xuxemon:', error);
      }
    );
  }

  debugXuxemon(): void {
    this.userService.debugXuxemon().subscribe(
      response => {
        console.log('Xuxemons creados correctamente:', response);
        this.loadUsers();
        // Aquí puedes agregar lógica adicional, como volver a cargar la lista de usuarios
      },
      error => {
        console.error('Error al crear Xuxemons:', error);
      }
    );
  }
}