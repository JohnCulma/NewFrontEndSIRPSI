import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor() { }
  

  getListEmpresas(): Observable<any>{
    const urlGetEmpresa = `${this.baseUrl}/empresas/ConsultarEmpresas`;
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer  ${token}`);
  
   return this.http.get(urlGetEmpresa,  { headers } );
  }

  deleteEmpresa(id: string): Observable<any> {
    const urlDeleteEmpresa = `${this.baseUrl}/empresas/EliminarEmpresa`;
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer  ${token}`);
    return this.http.delete(urlDeleteEmpresa, { headers } );
  }

  saveEmpresa(emprsa: any): Observable<any> {
    const urlSaveEmpresa = `${this.baseUrl}/empresas/EliminarEmpresa`;
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer  ${token}`);
    return this.http.post(urlSaveEmpresa, { headers } );
  }

  updateEmpresa(id: string, empresa: any): Observable<any> {
    const urlUpdateEmpresa = `${this.baseUrl}/empresas/EliminarEmpresa`;
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer  ${token}`);
    return this.http.post(urlUpdateEmpresa, { headers } );
  }
}
