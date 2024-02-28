import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Xuxemon } from '../../models/Xuxemon';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-editar-xuxemon',
  templateUrl: './edit-xuxemon.component.html',
  styleUrls: ['./edit-xuxemon.component.css']
})
export class EditXuxemonComponent implements OnInit {
  @Input() xuxemon: Xuxemon;
  xuxemonForm: FormGroup;
  mostrarFormularioEdicion: boolean = false;

  constructor(private fb: FormBuilder, private userService: UsersService) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    if (this.xuxemon) {
      this.xuxemonForm.patchValue(this.xuxemon);
    }
  }

  initForm(): void {
    this.xuxemonForm = this.fb.group({
      id: [this.xuxemon.id || '', [Validators.required]], // Asigna el valor de la ID si está disponible
      nombre: [this.xuxemon.Nombre || '', [Validators.required]],
      tipo: [this.xuxemon.Tipo || '', [Validators.required]],
      imagen: [this.xuxemon.Imagen || '', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.xuxemonForm.valid) {
      console.log('Datos del formulario:', this.xuxemonForm.value);
      this.userService.editXuxemon(this.xuxemonForm.value, this.xuxemon.id)
        .subscribe(response => {
          console.log('Xuxemon actualizado correctamente:', response);
        }, error => {
          console.error('Error al actualizar el xuxemon:', error);
        });
      // Aquí iría la lógica para actualizar el xuxemon, por ejemplo, mediante un servicio
    }
  }

  editarXuxemon(xuxemon: Xuxemon): void {
    this.xuxemon = xuxemon; // Establece el xuxemon seleccionado en el formulario
    this.mostrarFormularioEdicion = true; // Muestra el formulario de edición
  }
}
