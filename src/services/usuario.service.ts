import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../app/interface/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient ); 

  constructor() { }

  getUsuarios(): Observable<any>{
    const urlGetUsuarios = `${this.baseUrl}/usuario/ConsultarUsuarios`;
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer  ${token}`);
  
   return this.http.get(urlGetUsuarios,  { headers } );
  }


  deleteUsuarios(id: string): Observable<any>{
    const urlDeletesuarios = `${this.baseUrl}/user/DeleteUser`;
    const token = localStorage.getItem('token');
  
   return this.http.delete(urlDeletesuarios, {
  headers: new HttpHeaders({
    'Authorization': `Bearer  ${token}`
  }),
   body: { "Id": id }
    });
  }

  saveUsuario(usuario: Usuario): Observable<any>{    
    const urlSaveUsuario = `${this.baseUrl}/user/RegisterUser`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer  ${token}`);    
  
   return this.http.post(urlSaveUsuario, usuario, {headers});
  }

  updateUsuario(usuario: Usuario){
    
  }



}
