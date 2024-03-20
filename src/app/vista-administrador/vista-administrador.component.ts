import { Component } from '@angular/core';
import { UsersService } from '../services/users.service'; // Ajusta la ruta según la ubicación real de tu servicio

@Component({
  selector: 'app-vista-administrador',
  templateUrl: './vista-administrador.component.html',
  styleUrls: ['./vista-administrador.component.css']
})
export class VistaAdministradorComponent {

  constructor(private userService: UsersService) { }

  cambiarTamanoXuxemons(nuevoTamano: string) {
    this.userService.updateXuxemonSize(nuevoTamano).subscribe(
      _response => {
        alert('Tamaño de xuxemons por defecto actualizado correctamente');
      },
      error => {
        alert(error.message || 'Error al actualizar el tamaño de los xuxemons')
      }
    );
  }
}



