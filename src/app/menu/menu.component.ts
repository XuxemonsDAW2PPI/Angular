import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router) {}

  navigateToUsers() {
    this.router.navigate(['/lista-usuarios']);
  }

  navigateToInventory() { // Añade este método
    this.router.navigate(['/inventario']); // Utiliza la ruta que definiste
  }

}
