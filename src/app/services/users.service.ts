import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { Xuxemon } from "../../models/Xuxemon";
import { Usuario } from "../../models/Usuario";
import { Login } from "../../models/Login";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  allUsers: any[] = [];

  constructor(private http: HttpClient) {
  }

  getUsers(page: number = 1): Observable<Xuxemon[]> {
    // Ejemplo de HttpHeaders
    const httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

    // Ejemplo de HttpParams
    const httpParams: HttpParams = new HttpParams().set("page", page.toString());

    return this.http.get<Xuxemon[]>("https://reqres.in/api/users", { headers: httpHeaders, params: httpParams }).pipe(
      map((res: any) => {
        console.log(res);
        return res.data;
      })
    );
  }

  register(data: Usuario): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/User/store', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  login(data: Login ): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/User/login', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  loadUsers() {
    return this.http.get<any[]>('http://127.0.0.1:8000/api/Xuxemon/');
  }

  editXuxemon(data: Xuxemon, id: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Xuxemon/update/${id}`;
    return this.http.post(url, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  }
