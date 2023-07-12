import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { EmpresasComponent } from './empresas.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmpresasComponent],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    FormsModule
  ]
})
export class EmpresasModule { }
