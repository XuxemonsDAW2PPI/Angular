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
  asignacionRealizada = false;

  constructor(private router: Router, private route: ActivatedRoute, private UsersService: UsersService) { this.asignacionRealizada = this.UsersService.getAsignacionRealizada();}

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
    this.router.navigate(['/xuxemons', this.userId]);
  }

  aumentarCantidadAleatoria() {
    this.UsersService.aumentarCantidadAleatoria(this.userId)
      .subscribe(
        response => {
          console.log(response); 
          alert(response);
          this.getInventario(); 
        },
        error => {
          console.log('Error al aumentar la cantidad aleatoria:', error);
        }
      );
  }

  aumentarObjetosDiarios() {
    this.UsersService.aumentarObjetosDiarios(this.userId)
      .subscribe(
        response => {
          console.log(response); 
          alert(response);
          this.getInventario(); 
        },
        error => {
          alert('Espera al siguiente día');
          console.log('Error al aumentar los objetos diarios:', error);
        }
      );
  }


  asignarXuxemons() {
    if (this.asignacionRealizada) {
      console.error('La asignación ya se ha realizado.');
      alert('Solo puedes activar 4 xuxemons una vez');
      return;
    }

    if (!this.userId) {
      console.error('ID de usuario no especificado.');
      return;
    }

    this.UsersService.asignar4Xuxemons(this.userId)
      .subscribe(
        response => {
          console.log('Xuxemons asignados correctamente:', response);
          alert('4 xuxemons activados correctamente');
          this.asignacionRealizada = true;
        },
        error => {
          console.error('Error al asignar xuxemons:', error);
          alert('Ya tienes 4 xuxemons asignados');
        }
      );
  }
  
}


