import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinisteriosComponent } from './ministerios.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MinisteriosComponent,
        data: {
          title: "ministerios",
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
export class MinisteriosRoutingModule { }
