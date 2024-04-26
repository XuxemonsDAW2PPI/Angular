import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Xuxemon } from "../../models/Xuxemon";

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {

  userId: number;
  xuxemonsInfectadosBajon: Xuxemon[];
  xuxemonsInfectadosSobredosis: Xuxemon[];
  xuxemonsInfectadosAtracon: Xuxemon[];
  selectedXuxemonName: string;
  mostrarInventarioBajon: boolean = false;
  inventario: any;
  mostrarInventarioSobredosis: boolean = false;
  mostrarInventarioAtracon: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UsersService) {}

  ngOnInit(): void {
    this.getUserIdFromUrl();
    this.loadXuxemonsInfectados();
  }

  getUserIdFromUrl() {
    this.route.paramMap.subscribe(params => {
      if (params !== null) {
        const userIdParam = params.get('userId');
        if (userIdParam !== null) {
          this.userId = +userIdParam;
        } else {
          console.error('ID de usuario no encontrada en la URL');
        }
      }
    });
  }

  loadXuxemonsInfectados(): void {
    this.userService.verXuxemonsInfectados(this.userId)
      .subscribe(
        (data: any) => {
          this.xuxemonsInfectadosBajon = data.Bajon;
          this.xuxemonsInfectadosSobredosis = data.Sobredosis;
          this.xuxemonsInfectadosAtracon = data.Atracon;
        },
        error => {
          console.error('Error al cargar los Xuxemons infectados:', error);
        }
      );
  }

  curarEnfermedad1(userId: number, nombreXuxemon: string): void {
    this.userService.curarEnfermedad1(this.userId, nombreXuxemon)
      .subscribe(
        (response: any) => {
          console.log('Enfermedad 1 curada con éxito:', response);
          alert('El xuxemon ha sido vacunado y curado con éxito');
          this.mostrarInventarioBajon = false;
          this.loadXuxemonsInfectados();
        },
        error => {
          console.error('Error al curar la Enfermedad 1:', error);
        }
      );
  }

  curarEnfermedad2(userId: number, nombreXuxemon: string): void {
    this.userService.curarEnfermedad2(this.userId, nombreXuxemon)
      .subscribe(
        (response: any) => {
          console.log('Enfermedad 2 curada con éxito:', response);
          alert('El xuxemon ha sido vacunado y curado con éxito');
          this.mostrarInventarioSobredosis = false;
          this.loadXuxemonsInfectados();
        },
        error => {
          console.error('Error al curar la Enfermedad 2:', error);
        }
      );
  }

  curarEnfermedad3(userId: number, nombreXuxemon: string): void {
    this.userService.curarEnfermedad3(this.userId, nombreXuxemon)
      .subscribe(
        (response: any) => {
          console.log('Enfermedad 3 curada con éxito:', response);
          alert('El xuxemon ha sido vacunado y curado con éxito');
          this.mostrarInventarioAtracon = false;
          this.loadXuxemonsInfectados();
        },
        error => {
          console.error('Error al curar la Enfermedad 3:', error);
        }
      );
  }

  vacunarBajondeAzucarVisual(xuxemon: Xuxemon) {

    this.selectedXuxemonName = xuxemon.nombre;
    this.mostrarInventarioBajon = true;

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

  vacunarSobredosisVisual(xuxemon: Xuxemon) {

    this.selectedXuxemonName = xuxemon.nombre;
    this.mostrarInventarioSobredosis = true;

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

  vacunarAtraconVisual(xuxemon: Xuxemon) {

    this.selectedXuxemonName = xuxemon.nombre;
    this.mostrarInventarioAtracon = true;

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
    this.mostrarInventarioBajon = false;
    this.mostrarInventarioSobredosis = false;
    this.mostrarInventarioAtracon = false;
  }

  
  evitarCierre(event: MouseEvent) {
    event.stopPropagation(); // Evitar que el clic se propague al contenedor exterior
  }

}

