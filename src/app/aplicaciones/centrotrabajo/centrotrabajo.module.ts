import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentrotrabajoRoutingModule } from './centrotrabajo-routing.module';
import { CentrotrabajoComponent } from './centrotrabajo.component';


@NgModule({
  declarations: [CentrotrabajoComponent],
  imports: [
    CommonModule,
    CentrotrabajoRoutingModule
  ]
})
export class CentrotrabajoModule { }
