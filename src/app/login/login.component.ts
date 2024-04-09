import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from "../../models/Login";
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  usuario: Login = {
    nombre: '',
    password: '',
  };

  constructor(private fb: FormBuilder, private router: Router, private service: UsersService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.service.login(this.usuario).subscribe(response => {
      alert('Inicio de sesión exitoso');
  
      if (response.usertype === 'Admin') {
        this.router.navigate(['/lista-usuarios']);
      } else if (response.usertype === 'Usuario') {
        if (response.id) { 
          this.router.navigate(['/menu', response.id]);
        } else {
          console.error('El ID del usuario no está definido');
        }
      } else {
        alert('Tipo de usuario no reconocido');
      }
    }, error => {
      alert(error.message || 'Ha ocurrido un error')
    });  
  }
  
}
