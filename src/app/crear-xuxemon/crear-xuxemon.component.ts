// crear-xuxemon.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Importa el servicio si estás utilizando uno para comunicarte con una API o base de datos
// import { XuxemonService } from '../services/xuxemon.service';

@Component({
  selector: 'app-crear-xuxemon',
  templateUrl: './crear-xuxemon.component.html',
  styleUrls: ['./crear-xuxemon.component.css']
})
export class CrearXuxemonComponent implements OnInit {
  xuxemonForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private xuxemonService: XuxemonService // Descomenta si estás utilizando un servicio
  ) {}

  ngOnInit(): void {
    this.xuxemonForm = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      imagen: [''] // Opcional, según tu modelo de Xuxemon
    });
  }

  onSubmit(): void {
    if (this.xuxemonForm.valid) {
      console.log('Formulario válido, datos:', this.xuxemonForm.value);
      // Aquí iría la lógica para enviar los datos del formulario a tu backend o servicio
      // Por ejemplo: this.xuxemonService.crearXuxemon(this.xuxemonForm.value).subscribe();
      this.router.navigate(['/lista-usuarios']); // Ajusta la ruta según tu necesidad
    }
  }
}
