import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Usuario} from "../../models/user.model";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {






  eliminarUsuario(_t8: Usuario) {
throw new Error('Method not implemented.');
}
editarUsuario(_t8: Usuario) {
throw new Error('Method not implemented.');
}

  currentPage: number = 1;
  pageSize: number = 48; // Ajusta según la necesidad de mostrar filas de 6
  usersInPage: Usuario[] = [];
  allUsers: Usuario[] = [];

  constructor() { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    fetch('assets/jmy6n-jpr2k.json')
      .then(response => response.json())
      .then(data => {
        this.allUsers = data;
        this.updateUsersBasedOnPage();
      })
      .catch(err => console.error('Error al cargar el archivo JSON:', err));
  }

 

  updateUsersBasedOnPage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.usersInPage = this.allUsers.slice(startIndex, endIndex);
  }
}