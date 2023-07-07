import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthStatus } from '../interface/auth-status.enum';



export const isAutheticatedGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);
  const router = inject( Router );

  const url = state.url;


  // console.log(url);


  // console.log({status: authService.authStatus()});

  if ( authService.authStatus() === AuthStatus.autheticated ) return true;

    // console.log('mi guard');
  // console.log({route, state});

  

  router.navigateByUrl('login/image');

  return false;
};
