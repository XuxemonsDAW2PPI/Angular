import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { UsersService } from '../services/users.service';
import { Usuario } from "../../models/Usuario";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  usuario: Usuario = {
    nombre: '',
    email: '',
    password: '',
    usertype: ''
  };

  constructor(private fb: FormBuilder, private router: Router, private service: UsersService ) {} // Inyecta Router para usarlo en la navegación

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      usertype: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup): { [key: string]: any } | null {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('repeatPassword')!.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {

    this.service.register(this.usuario).subscribe(response => {
      // Manejar la respuesta del servidor si es necesario
      this.router.navigate(['/login']);
    }, error => {
      alert(error.message || 'Ha ocurrido un error')
      // Manejar el error si es necesario
    });
  }
}
