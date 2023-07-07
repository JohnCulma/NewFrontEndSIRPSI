import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SamplePageComponent } from './sample-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SamplePageComponent,
        data: {
          title: "Empresas",
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
export class SamplePageRoutingModule { }
