import { Component } from '@angular/core';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  // Asegúrate de que las rutas a las imágenes coincidan con donde las has guardado en tu proyecto
  objetos = [
    { id: 11, nombre: 'Monedas', imagen: 'assets/coins.png', cantidad: 0 },
    { id: 1, nombre: 'Caramelos', imagen: 'assets/xuxes/xuxe1.png', cantidad: 0 },
    { id: 2, nombre: 'Piruleta ', imagen: 'assets/xuxes/xuxe2.png', cantidad: 0 },
    { id: 3, nombre: 'Piruleta Lazo', imagen: 'assets/xuxes/xuxe3.png', cantidad: 0 },
    { id: 4, nombre: 'Algodon de Azucar', imagen: 'assets/xuxes/xuxe4.png', cantidad: 0 },
    { id: 5, nombre: 'Tableta de Chocolate', imagen: 'assets/xuxes/xuxe5.png', cantidad: 0 },
    { id: 6, nombre: 'Caramelo', imagen: 'assets/xuxes/xuxe6.png', cantidad: 0 },
    { id: 7, nombre: 'Baston de Caramelo', imagen: 'assets/xuxes/xuxe7.png', cantidad: 0 },
    { id: 8, nombre: 'Caramelo Largo', imagen: 'assets/xuxes/xuxe8.png', cantidad: 0 },
    { id: 9, nombre: 'Carmelo Redondo y Largo', imagen: 'assets/xuxes/xuxe9.png', cantidad: 0 },
    { id: 10, nombre: 'Surtido Caramelos', imagen: 'assets/xuxes/xuxe10.png', cantidad: 0 },
];

  incrementarCantidadAleatoria() {
    // Selecciona un objeto al azar.
    const objetoAleatorio = this.objetos[Math.floor(Math.random() * this.objetos.length)];
    // Incrementa la cantidad de ese objeto en un número aleatorio entre 1 y 10.
    const cantidadAAgregar = Math.floor(Math.random() * 10) + 1;
    objetoAleatorio.cantidad += cantidadAAgregar;
    console.log(`Se añadió ${cantidadAAgregar} a ${objetoAleatorio.nombre}. Nueva cantidad: ${objetoAleatorio.cantidad}`);
  }

  mostrarInventario(){
    
  }

}
