import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  inventario: any;
  userId: number;

  constructor(private router: Router, private route: ActivatedRoute, private UsersService: UsersService) { }

  ngOnInit(): void {
    this.getUserIdFromUrl();
  }

  getUserIdFromUrl() {
    this.route.paramMap.subscribe(params => {
      if (params !== null) {
        const userIdParam = params.get('userId');
        if (userIdParam !== null) {
          this.userId = +userIdParam;
          this.getInventario(); 
        } else {
          console.error('ID de usuario no encontrada en la URL');
        }
      }
    });
  }

  getInventario() {
    this.UsersService.getInventario(this.userId)
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

  VermisXuxemons() {
    this.router.navigate(['/xuxemons']);
  }
}


