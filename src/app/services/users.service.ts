import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import {  Usuario } from "../../models/user.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers(page: number = 1): Observable<Usuario[]> {
    // Ejemplo de HttpHeaders
    const httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

    // Ejemplo de HttpParams
    const httpParams: HttpParams = new HttpParams().set("page", page.toString());

    return this.http.get<Usuario[]>("https://reqres.in/api/users", { headers: httpHeaders, params: httpParams }).pipe(
      map((res: any) => {
        console.log(res);
        return res.data;
      })
    );
  }

  register(data: { email: string; password: string }): Observable<any> {
    return this.http.post('https://reqres.in/api/register', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post('https://reqres.in/api/login', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map((res: any) => {
        // Aquí podrías manejar la respuesta de login, como guardar tokens
        return res;
      })
    );
  }

}
