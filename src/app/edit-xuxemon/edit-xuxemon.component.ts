// editar-xuxemon.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Xuxemon } from '../../models/Xuxemon'; 

@Component({
  selector: 'app-editar-xuxemon',
  templateUrl: './edit-xuxemon.component.html',
  styleUrls: ['./edit-xuxemon.component.css']
})
export class EditXuxemonComponent implements OnInit {
  @Input() xuxemon: Xuxemon; 
  xuxemonForm: FormGroup;

  constructor(private fb: FormBuilder) {}

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
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.xuxemonForm.valid) {
      console.log('Datos del formulario:', this.xuxemonForm.value);
      // Aquí iría la lógica para actualizar el xuxemon, por ejemplo, mediante un servicio
    }
  }
}
