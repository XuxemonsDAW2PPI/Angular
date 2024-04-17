import { Component, OnInit } from '@angular/core';
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
  tamanoSeleccionado: string = ''; // Valor predeterminado del tamaño seleccionado


  xuxesParaMediano: any;
  xuxesParaGrande: any;
  xuxesDiarias: number;
  userId: number;

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
        alert('Xuxemon eliminado correctamente');
        this.loadUsers();
      },
      error => {
        console.error('Error al eliminar el xuxemon:', error);
      }
    );
  }

  debugXuxemon(): void {
    this.userService.debugXuxemon(this.tamanoSeleccionado).subscribe(
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


  confirmarMediano(): void {
    this.userService.actualizarConfiguracionMediano(this.xuxesParaMediano).subscribe(
      (      response: any) => {
        console.log('Configuración actualizada:', response);
        alert('Configuración de Mediano actualizada correctamente');
      },
      (      error: any) => {
        console.error('Error al actualizar la configuración:', error);
      }
    );
  }
  
  confirmarGrande(): void {
    this.userService.actualizarConfiguracionGrande(this.xuxesParaGrande).subscribe(
      (      response: any) => {
        console.log('Configuración actualizada:', response);
        alert('Configuración de Grande actualizada correctamente');
      },
      (      error: any) => {
        console.error('Error al actualizar la configuración:', error);
      }
    );
  }

  aumentarobjetosdiarios() {
    this.userService.actualizarXuxesDiarias(this.userId, this.xuxesDiarias)
      .subscribe({
        next: (response) => alert('Cantidad actualizada correctamente!'),
        error: (error) => console.error('Error al actualizar la cantidad:', error)
      });
  }


  
}