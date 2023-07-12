import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinisteriosRoutingModule } from './ministerios-routing.module';
import { MinisteriosComponent } from './ministerios.component';


@NgModule({
  declarations: [MinisteriosComponent],
  imports: [
    CommonModule,
    MinisteriosRoutingModule
  ]
})
export class MinisteriosModule { }
