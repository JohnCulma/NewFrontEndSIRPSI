import { Component, inject, OnInit } from '@angular/core';
import { RolService } from '../../../../services/rol.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-rol',
  templateUrl: './usuario-rol.component.html',
  styleUrls: ['./usuario-rol.component.scss']
})
export class UsuarioRolComponent implements OnInit {
  [x: string]: any;

private _rolService = inject( RolService )
private router = inject( Router )


private fb = inject( FormBuilder );


public formRol: FormGroup = this.fb.group({
   rol: new FormControl()
})

rolesList: any;
verSeleccion: any;

constructor() { }
ngOnInit() {
 
  this._rolService.rolContent().subscribe((data:any) => {
    debugger
    this.rolesList = data;
  }, error => {
    console.log(error);
  });
}

on(dato){
  debugger  

  if (dato === "0")
  {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Selecciona un rol.',
      showConfirmButton: false,
      timer: 1800
    });
  }else{
    this.router.navigateByUrl('dashboard/project')
  }

}
}

