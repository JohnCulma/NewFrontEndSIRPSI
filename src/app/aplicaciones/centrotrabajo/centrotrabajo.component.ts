import { Component, inject, OnInit } from '@angular/core';
import { CentroTrabajoService } from 'src/services/centro-trabajo.service';

@Component({
  selector: 'app-centrotrabajo',
  templateUrl: './centrotrabajo.component.html',
  styleUrls: ['./centrotrabajo.component.scss']
})
export class CentrotrabajoComponent implements OnInit {

  private _centroTrabajo = inject( CentroTrabajoService );
  listCetroTrabajo: any;

  constructor(){}

  ngOnInit(): void {
    this.obtenerCentrosTrabajo();
  }

  obtenerCentrosTrabajo() {  
    this._centroTrabajo.getCentroTrabajo().subscribe(data => {
      debugger
      console.log(data);
      this.listCetroTrabajo = data;
    }, error => {
      console.log(error);
    })
  }

}
