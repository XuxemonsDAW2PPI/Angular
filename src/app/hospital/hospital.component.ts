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
          alert(response);
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
          alert(response);
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
          alert(response);
          this.loadXuxemonsInfectados();
        },
        error => {
          console.error('Error al curar la Enfermedad 3:', error);
        }
      );
  }

}

