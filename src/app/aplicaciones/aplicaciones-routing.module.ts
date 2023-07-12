import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UsuariosComponent,
        data: {
          title: "usuarios",
          breadcrumb: ""
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicacionesRoutingModule { }
