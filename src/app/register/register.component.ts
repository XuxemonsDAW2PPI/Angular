import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router para la navegación

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {} // Inyecta Router para usarlo en la navegación

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup): { [key: string]: any } | null {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('repeatPassword')!.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    // Redirige a la ruta de login tras el intento de registro
    this.router.navigate(['/login']);
  }
}
