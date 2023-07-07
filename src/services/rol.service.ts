import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { EstadoResponse } from 'src/app/interface/estado.response.interface';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Estado } from 'src/app/interface';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );
  private _currentRoles = signal<Estado|null>(null);

  datos: string;
  //Expuestos
  public currentRoles = computed(() => this._currentRoles());


  constructor() { }

  private setRol(estado: Estado): Estado{
    this._currentRoles.set(estado);          
          console.log({estado});
          return estado;
};

  rolContent(): Observable<any[]>{
    // const urlEstado = `${this.baseUrl}/estados/ConsultarEstados`;
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer  ${token}`);
 
    // return this.http.get(urlEstado,  { headers } ).subscribe(data => 
    // console.log(data)      
    // );
    const urlRol = `${this.baseUrl}/rolesusuario/ConsultarRolesUsuario`;
    return this.http.get<any>(urlRol,  { headers });
    // pipe(
    //   map( ({estados}) => this.setRol(estados)),
    //   catchError(err => {
    //     console.log(err);
    //       return throwError(() => err.error.message)
    //   } )
    // );
  
  }
}
