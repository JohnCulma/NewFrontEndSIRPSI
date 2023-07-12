import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AplicacionesRoutingModule } from './aplicaciones-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    AplicacionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class AplicacionesModule { }
