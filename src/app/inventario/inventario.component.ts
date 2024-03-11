import { Component } from '@angular/core';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  // Asegúrate de que las rutas a las imágenes coincidan con donde las has guardado en tu proyecto
  objetos = [
    { id: 1, nombre: 'Lollipop', imagen: 'assets/xuxes/xuxe1.png', descripcion: 'xuxe1', cantidad: 100  },
    { id: 2, nombre: 'Cotton Candy', imagen: 'assets/xuxes/xuxe2.png', descripcion: 'xuxe2', cantidad: 10  },
    { id: 3, nombre: 'Chocolate Bar', imagen: 'assets/xuxes/xuxe3.png', descripcion: 'xuxe3', cantidad: 20  },
    { id: 4, nombre: 'Candy', imagen: 'assets/xuxes/xuxe4.png', descripcion: 'xuxe4', cantidad: 30  },
    { id: 5, nombre: 'Candy Cane', imagen: 'assets/xuxes/xuxe5.png', descripcion: 'xuxe5', cantidad: 40  },
    { id: 6, nombre: 'More Candy', imagen: 'assets/xuxes/xuxe6.png', descripcion: 'xuxe6' , cantidad: 50 },
    { id: 7, nombre: 'Even More Candy', imagen: 'assets/xuxes/xuxe7.png', descripcion: 'xuxe7', cantidad: 60  },
    { id: 8, nombre: 'Assorted Candies', imagen: 'assets/xuxes/xuxe8.png', descripcion: 'xuxe8' , cantidad: 70 },
    { id: 9, nombre: 'Even More Candy', imagen: 'assets/xuxes/xuxe9.png', descripcion: 'xuxe9', cantidad: 80  },
    { id: 10, nombre: 'Assorted Candies', imagen: 'assets/xuxes/xuxe10.png', descripcion: 'xuxe10' , cantidad: 90 }


  ];

  incrementarCantidadAleatoria() {
    // Selecciona un objeto al azar.
    const objetoAleatorio = this.objetos[Math.floor(Math.random() * this.objetos.length)];
    // Incrementa la cantidad de ese objeto en un número aleatorio entre 1 y 10.
    const cantidadAAgregar = Math.floor(Math.random() * 10) + 1;
    objetoAleatorio.cantidad += cantidadAAgregar;
    console.log(`Se añadió ${cantidadAAgregar} a ${objetoAleatorio.nombre}. Nueva cantidad: ${objetoAleatorio.cantidad}`);
  }

}
