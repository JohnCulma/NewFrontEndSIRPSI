import { Injectable, inject, signal, computed } from "@angular/core";
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { User } from "src/app/interface";
import { AuthStatus } from "src/app/interface/auth-status.enum";
import { LoginResponse } from '../app/interface/login.response.interface';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class AuthService{
    private readonly baseUrl: string = environment.baseUrl;
    private http = inject( HttpClient );

    private _currentUser = signal<User|null>(null);
    private _authStatus = signal<AuthStatus>(AuthStatus.checking);

    //Expuestos
    public currentUser = computed(() => this._currentUser());
    public authStatus = computed(() => this._authStatus());

    token: string;

    constructor(){}

    private setAuthentication(user: User, token: string): boolean{
          this._currentUser.set(user);
                localStorage.setItem('token', token);
                this._authStatus.set(AuthStatus.autheticated);
                localStorage.getItem('token');
                console.log({user, token});
                return true;
    };

    login(nit:string, document:string, password:string): Observable<boolean>{

        const url = `${ this.baseUrl }/user/Login`;
        const body = {nit, document, password}

        

        return this.http.post<LoginResponse>(url, body)
        .pipe(
            map( ({user, token}) => this.setAuthentication(user, token)),
            // tap( ({user, token}) => {
            //     this._currentUser.set(user);
            //     this._authStatus.set(AuthStatus.autheticated);
            //     localStorage.getItem('token');
                
            //     console.log({user, token});
            // }),
            // map( () => true ),

            catchError(err => {
              console.log(err);
                return throwError(() => err.error.message)
            } )
        );
    }

  
    checkAuthService():Observable<boolean>{
        // const url = `$this.`
        const token = localStorage.getItem('token');
        if(!token) {
            return of(false);
        }else{
            return of(true)
        };       
    }

    logout(){
      localStorage.removeItem('token');
      this._currentUser.set(null);
      this._authStatus.set(AuthStatus.notAuthenticated);
    };
}