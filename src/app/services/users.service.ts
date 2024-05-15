import { Injectable } from '@angular/core';
import { map, Observable, tap, throwError } from "rxjs";
import { Xuxemon } from "../../models/Xuxemon";
import { Usuario } from "../../models/Usuario";
import { Login } from "../../models/Login";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  allUsers: any[] = [];
  private asignacionRealizada = false;

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


  aumentarObjetosDiarios(userId: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Inventario/${userId}/aumentar-objetos-diarios`;
    return this.http.post<any>(url, {});
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

  asignar4Xuxemons(userId: number): Observable<any> {
    if (this.asignacionRealizada) {
      return throwError('La asignación ya se ha realizado.');
    }
    const url = `http://127.0.0.1:8000/api/Inventario/${userId}/asignarxuxemons`;
    return this.http.post<any>(url, {}).pipe(
      tap(() => this.asignacionRealizada = true) // Marca la asignación como realizada después de una ejecución exitosa
    );
  }

  getAsignacionRealizada(): boolean {
    return this.asignacionRealizada;
  }

  alimentarXuxemon(userId: number, xuxemonNombre: string, objetonombre: string): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Xuxemon/alimentar/${userId}/${xuxemonNombre}/${objetonombre}`;
    return this.http.post<any>(url, {});
  }

  verXuxemonsInfectados(userId: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/api/Inventario/${userId}/xuxemoninfectado`;
    return this.http.get<any>(url, {});
  }


  actualizarXuxesDiarias(userId: number, nuevaCantidad: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Inventario/{userId}/aumentar-objetos-diarios`;
    return this.http.post(url, {
      userId: userId,
      nuevaCantidad: nuevaCantidad
    }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  desactivarXuxemon(idUsuario: number, idXuxemon: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Xuxemon/eliminar/${idUsuario}/${idXuxemon}`;
    return this.http.post<any>(url, {});
  }

  activarXuxemon(idusuario: number, id: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Xuxemon/activar/${idusuario}/${id}`;
    return this.http.post<any>(url, {});
  }

  getXuxemonParaEditar(idUsuario: number, idXuxemon: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Xuxemon/editar/${idUsuario}/${idXuxemon}`;
    return this.http.get<any>(url);
  }


  ////SERVICIOS ENFERMEDADES
  // Método para actualizar la enfermedad 1
  actualizarEnfermedad1(userId: number, porcentajeInfeccion1: number): Observable<any> {
    const url = `http://127.0.0.1:8000/enfermedad1`;
    return this.http.post<any>(url, { userId: userId, Enfermedad1: porcentajeInfeccion1 });
  }

  // Método para actualizar la enfermedad 2
  actualizarEnfermedad2(userId: number, porcentajeInfeccion2: number): Observable<any> {
    const url = `http://127.0.0.1:8000/enfermedad2`;
    return this.http.post<any>(url, { userId: userId, Enfermedad2: porcentajeInfeccion2 });
  }

  // Método para actualizar la enfermedad 3
  actualizarEnfermedad3(userId: number, porcentajeInfeccion3: number): Observable<any> {
    const url = `http://127.0.0.1:8000/enfermedad3`;
    return this.http.post<any>(url, { userId: userId, Enfermedad3: porcentajeInfeccion3 });
  }

  getXuxemonsDisponibles(): Observable<any> {
    const url = 'http://127.0.0.1:8000/api/Xuxemon/'; // Ajusta la URL según la ruta de tu API en Laravel
    return this.http.get<any>(url);
  }

  replaceXuxemon(userId: number, xuxemonId: number, xuxemonData: any): Observable<any> {
    const url = `Xuxemon/{idUsuario}/xuxemons/{idXuxemon}/replace/${userId}/xuxemons/${xuxemonId}/replace`;
    return this.http.put(url, xuxemonData);
  }


  //Curar enfermedades
  curarEnfermedad1(userId: number, nombre: string): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Inventario/${userId}/${nombre}/curarenfermedad1`; 
    return this.http.get<any>(url);
  }

  curarEnfermedad2(userId: number, nombre: string): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Inventario/${userId}/${nombre}/curarenfermedad2`; 
    return this.http.get<any>(url);
  }
  

  curarEnfermedad3(userId: number, nombre: string): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Inventario/${userId}/${nombre}/curarenfermedad3`; 
    return this.http.get<any>(url);
  }

  ///////SERVICIOS DISCORD


  buscarAmigo(userId: number, tag: string): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Amigos/${userId}/buscaramigos?tag=${tag}`;
    return this.http.get<any>(url);
  }

  enviarSolicitudAmigo(userId: number, tagAmigo: string): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Amigos/${userId}/añadiramigo?amigo=${encodeURIComponent(tagAmigo)}`;
    return this.http.get<any>(url);
  }

  obtenerSolicitudesAmistad(userId: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Amigos/${userId}/solicitudes`;
    return this.http.get<any>(url);
  }

  aceptarSolicitud(userId: number, tagAmigo: string): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Amigos/${userId}/aceptaramigo?solicitud=${encodeURIComponent(tagAmigo)}`;
    return this.http.get<any>(url);
  }

  denegarSolicitud(userId: number, tagAmigo: string): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Amigos/${userId}/rechazaramigo?solicitud=${encodeURIComponent(tagAmigo)}`;
    return this.http.get<any>(url);
  }

  listaAmigos(userId: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Amigos/${userId}/listaamigos`;
    return this.http.get<any>(url);
  }

  obtenerTagUsuario(userId: number): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/User/${userId}/tag`);
  }
  

  // Intercambio

  registrarSolicitudIntercambio(idUsuario1: number, tagUsuario1: string, nombreXuxemon1: string, tipo1: string, tamanoXuxemon1: string, caramelosComidosXuxemon1: number, idUsuario2: number, tagUsuario2: string) {
    const url = `http://127.0.0.1:8000/api/Intercambio/solicitud/${idUsuario1}/${tagUsuario1}/${nombreXuxemon1}/${tipo1}/${tamanoXuxemon1}/${caramelosComidosXuxemon1}/${idUsuario2}/${tagUsuario2}`;
    return this.http.post<any>(url, {});
  }

  listarSolicitudesPendientes(idUsuario: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Intercambio/listasolicitudes/${idUsuario}`;
    return this.http.get<any>(url);
  }

  Solicitudesrecibidas(idUsuario: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Intercambio/solicitudesrecibidas/${idUsuario}`;
    return this.http.get<any>(url);
  }
  DenegarIntercambio(idUsuario: number, idIntercambio: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Intercambio/${idUsuario}/denegar/${idIntercambio}`;
    return this.http.delete<any>(url);
  }

  aceptarSolicitudIntercambio(idusuario: number, datos: any): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Intercambio/aceptar/${idusuario}`;
    return this.http.post(url, datos);
  }

  confirmarIntercambio1(idusuario: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/Intercambio/aceptarfinal?idusuario=${idusuario}`;
    return this.http.post<any>(url, {});
  }
}
