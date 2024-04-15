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
    console.log(data)
    return this.http.post('http://127.0.0.1:8000/api/login', data, {
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

  eliminarXuxemon(id: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Xuxemon/delete/${id}`;
    return this.http.delete(url, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  crearXuxemon(data: Xuxemon): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/Xuxemon/store', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  debugXuxemon(tamanoPorDefecto: string): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Xuxemon/load?tamanoPorDefecto=${tamanoPorDefecto}`;
    return this.http.get<any[]>(url);
  }

  getInventario(userId: number) {
    return this.http.get<any>(`http://127.0.0.1:8000/api/Inventario/${userId}`);
  }

  aumentarCantidadAleatoria(userId: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Inventario/${userId}/aumentar`;
    return this.http.post<any>(url, {});
  }

  disminuirCantidadObjeto(userId: number, objeto: string): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Inventario/disminuir/${userId}/${objeto}`;
    return this.http.post<any>(url, {});
  }

  getXuxemonsDelUser(userId: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/api/Xuxemon/mostrar/${userId}`;
    return this.http.get<any>(url, {});
  }

  /*updateXuxemonSize(newSize: string): Observable<any> {
    const url = 'http://127.0.0.1:8000/api/Xuxemon/actualizar-tamano'; 
    const data = { nuevoTamano: newSize }; 

    return this.http.post(url, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }*/



  actualizarConfiguracionMediano(cantidad: number) {
    const url = 'http://127.0.0.1:8000/api/sm_med'; // Asegúrate de que esta ruta es correcta
    return this.http.post(url, {sm_med: cantidad});
  }

  actualizarConfiguracionGrande(cantidad: number) {
    const url = 'http://127.0.0.1:8000/api/med_big'; // Asegúrate de que esta ruta es correcta
    return this.http.post(url, {med_big: cantidad});
  }

 // parametros();













  
  
}
