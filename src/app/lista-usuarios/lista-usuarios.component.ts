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

  getPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateUsersBasedOnPage();
    }
  }

  getNextPage() {
    const totalPages = Math.ceil(this.allUsers.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateUsersBasedOnPage();
    }
  }

  updateUsersBasedOnPage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.usersInPage = this.allUsers.slice(startIndex, endIndex);
  }
}