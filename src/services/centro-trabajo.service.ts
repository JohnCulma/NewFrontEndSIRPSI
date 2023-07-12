import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CentroTrabajoService {

  private readonly baseUrl: string = environment.baseUrl;

  private http = inject( HttpClient );

  constructor() { }

  getCentroTrabajo(): Observable<any>{
    const urlGetCentroTrabajo = `${this.baseUrl}/centrotrabajo/ConsultarCentroDeTrabajo`;
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer  ${token}`);
  
   return this.http.get(urlGetCentroTrabajo,  { headers } );
  }
}
