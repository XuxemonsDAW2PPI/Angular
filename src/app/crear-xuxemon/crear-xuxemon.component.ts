// crear-xuxemon.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
// Importa el servicio si estás utilizando uno para comunicarte con una API o base de datos
// import { XuxemonService } from '../services/xuxemon.service';

@Component({
  selector: 'app-crear-xuxemon',
  templateUrl: './crear-xuxemon.component.html',
  styleUrls: ['./crear-xuxemon.component.css']
})
export class CrearXuxemonComponent implements OnInit {
  mostrarFormularioCrear: boolean = false;
  xuxemonForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService
    // private xuxemonService: XuxemonService // Descomenta si estás utilizando un servicio
  ) {}

  ngOnInit(): void {
    this.xuxemonForm = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      tamano: ['', [Validators.required]],
      imagen: [''] // Opcional, según tu modelo de Xuxemon
    });
  }

  onSubmit(): void {
    if (this.xuxemonForm.valid) {
      console.log('Formulario válido, datos:', this.xuxemonForm.value);
      this.userService.crearXuxemon(this.xuxemonForm.value).subscribe(response => {
        // Manejar la respuesta del servidor si es necesario
        this.router.navigate(['/lista-usuarios']);
      }, error => {
        alert(error.message || 'Ha ocurrido un error')
        // Manejar el error si es necesario
      });
      this.router.navigate(['/lista-usuarios']); // Ajusta la ruta según tu necesidad
    }
  }
}
