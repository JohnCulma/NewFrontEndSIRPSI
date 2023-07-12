import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MinisterioService {

  private readonly baseUrl: string = environment.baseUrl;

  private http = inject( HttpClient );

  constructor() { }

  getMinisterio(): Observable<any>{
    const urlGetEmpresa = `${this.baseUrl}/ministerio/ConsultarMinisterio`;
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer  ${token}`);
  
   return this.http.get(urlGetEmpresa,  { headers } );
  }
}
