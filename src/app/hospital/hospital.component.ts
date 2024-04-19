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
}

