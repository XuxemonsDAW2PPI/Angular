import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Xuxemon } from "../../models/Xuxemon";
import { UsersService } from "../services/users.service";

@Component({
  selector: 'app-listaxuxemons-sincrud',
  templateUrl: './listaxuxemons-sincrud.component.html',
  styleUrls: ['./listaxuxemons-sincrud.component.css']
})
export class ListaxuxemonsSincrudComponent {




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
}
