import { Component, inject, computed, effect } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './interface';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "endless";
  private authService = inject( AuthService );

  public finishAuthCheck = computed<boolean>(()=> {
    if ( this.authService.authStatus() === AuthStatus.checking){
      return false;
    }
    return true;
  });

  public authStatusChanggedEffect = effect(() =>{
    console.log('authStatus', this.authService.authStatus());
  });

  
}
