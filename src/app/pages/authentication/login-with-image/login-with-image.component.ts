import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-with-image',
  templateUrl: './login-with-image.component.html',
  styleUrls: ['./login-with-image.component.scss']
})
export class LoginWithImageComponent implements OnInit {

  private fb =           inject( FormBuilder );
  private authService =  inject( AuthService );
  private router =       inject( Router );

  list: any[]

  public form: FormGroup = this.fb.group({
    nit:      ['3467', Validators.required],
    document: ['1234567', Validators.required],
    password: ['Admin123*.', Validators.required],
    tc: ['', Validators.required]
  })

  constructor() { }

  ngOnInit() { }

  login(){
    if (this.form.value.tc == false){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Por favor acepte los terminos y condiciones.',
        showConfirmButton: false,
        timer: 1200
      });   
   
    }else{
    
    const { tc, nit, document, password} = this.form.value;
    if (tc == false){

    }else{
    this.authService.login(nit, document, password)
    .subscribe({
      next: () => this.router.navigateByUrl('roles/usuario'),
      error: (message)=>{
       Swal.fire('Error', message, 'error')
      },
      complete:() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1800
        });
      }
    })
  }
  }
  }

}
