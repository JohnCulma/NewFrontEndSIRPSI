import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './empresas.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EmpresasComponent,
        data: {
          title: "empresas",
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
export class EmpresasRoutingModule { }
