import { Component, inject, OnInit } from '@angular/core';
import { RolService } from '../../../../services/rol.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-usuario-rol',
  templateUrl: './usuario-rol.component.html',
  styleUrls: ['./usuario-rol.component.scss']
})
export class UsuarioRolComponent implements OnInit {
  [x: string]: any;

private _rolService = inject( RolService )
private router = inject( Router )


private fb =           inject( FormBuilder );


public formRol: FormGroup = this.fb.group({
   rol: new FormControl()
})

rolesList: any;
verSeleccion: any;

constructor() { }
ngOnInit() {
  this._rolService.rolContent().subscribe((data:any) => {
    this.rolesList = data;
  });
}

on(){

  this.router.navigateByUrl('dashboard/project')
}


}

