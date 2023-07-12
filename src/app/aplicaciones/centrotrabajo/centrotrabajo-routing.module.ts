import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentrotrabajoComponent } from './centrotrabajo.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CentrotrabajoComponent,
        data: {
          title: "centrosdetrabajo",
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
export class CentrotrabajoRoutingModule { }
