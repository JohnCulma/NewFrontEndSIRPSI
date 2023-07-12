import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadosService } from './estados.service';

@Injectable({
  providedIn: 'root'
})
export class TiposDocumentoService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor() { }

  getTipoDocumento(): Observable<any[]>{
    const urlTipoDocumento = `${this.baseUrl}/tipodocumento/ConsultarTipoDocumento`;
    const token = localStorage.getItem('token');
        
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer  ${token}`);
  
   return this.http.get<any>(urlTipoDocumento, { headers });
  }
}
