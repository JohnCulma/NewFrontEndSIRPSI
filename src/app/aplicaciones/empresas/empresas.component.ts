import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from 'src/app/interface';
import { EmpresaService } from 'src/services/empresa.service';
import { EstadosService } from 'src/services/estados.service';
import { TiposDocumentoService } from 'src/services/tipos-documento.service';
import { TiposEmpresaService } from 'src/services/tipos-empresa.service';
import { FormsModule } from '@angular/forms';
import { MinisterioService } from 'src/services/ministerio.service';
import Swal from 'sweetalert2';
import { content } from '../../shared/routes/content-routes';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

  private _empresaService = inject ( EmpresaService );
  private _estados =        inject ( EstadosService );
  private _tiposDoc =        inject ( TiposDocumentoService );
  private _tiposEmpresa =    inject ( TiposEmpresaService );
  private _modalService =   inject ( NgbModal );
  private _ministerio =     inject ( MinisterioService )

  listEmpresas: any;
  estadosList: any;
  listDocs: any;
  listTipoEmpresa: any;
  selectTipoDoc: string;
  selectEstado: string;
  selectEmpresa: string;

    //Model
    public empresaModel : Empresa = {
    TipoDocumento:        '',
    Documento:            '',
    DigitoVerificacion:   '',
    IdTipoEmpresa:        '',
    Nombre:               '',   
    Descripcion:          '',
    Observacion:          '',
    IdMinisterio:         '',
    idEstado:             ''
   };
  toastr: any;
  errorMessage: any;
  listMinisterios: any;
  selectMinisterios: string;
  selectTipoEmpresa: string;

  constructor(){

  }

  ngOnInit(): void {
    this.obtenerEmpresas();
  }

  getEstados(){
    this._estados.getEstados().subscribe((data:any) => {
      this.estadosList = data;
    });
  }

  getTiposDocumento(){
    this._tiposDoc.getTipoDocumento().subscribe((data:any)=> {
      this.listDocs = data;
      });    
  }

  getTiposEmpresa(){
    this._tiposEmpresa.getTiposEmpresa().subscribe((data:any)=> {
      this.listTipoEmpresa = data;
      });    
  }
  getMinisterios(){
    this._ministerio.getMinisterio().subscribe((data:any)=> {
      this.listMinisterios = data;
      });    
  }

  //Selecciones de id
  onChangeIdTypoDoc(selectIdTipoDoc:string){
    this.selectTipoDoc = selectIdTipoDoc;
     }

     onChangeEstado(selectIdEstado:string){
      this.selectEstado = selectIdEstado;
    }

    onChangeEmpresa(selectIdEmpresa:string){
      this.selectEmpresa = selectIdEmpresa;
    }   

    onChangeMinisterio(selectIdMinisterio:string){
      this.selectMinisterios = selectIdMinisterio;
    }   

    onChangeTipoEmpresa(selectIdTipoEmpresa:string){
      this.selectTipoEmpresa = selectIdTipoEmpresa
    }

    onOpenModalSave(content){

      this.getEstados();
      this.getTiposDocumento();  
      this.getTiposEmpresa();
      this.getMinisterios();
      this._tiposDoc.getTipoDocumento();  
      this._modalService.open(content, { size: 'lg' });  
    }


  obtenerEmpresas() {  
    this._empresaService.getEmpresas().subscribe(data => {
      debugger
      console.log(data);
      this.listEmpresas = data;
    }, error => {
      console.log(error);
    })
  }

  onSaveEmpresa(){
    debugger
    this.empresaModel.TipoDocumento = this.selectTipoDoc;
    this.empresaModel.IdTipoEmpresa = this.selectTipoEmpresa;
    this.empresaModel.IdMinisterio = this.selectMinisterios;
    this.empresaModel.idEstado = this.selectEstado;
    this._empresaService.saveEmpresa(this.empresaModel).subscribe({
      next: data => {
        debugger
        console.log(data);
        this.obtenerEmpresas();
        this.toastr.success('Usuario Registrado, exitosamente!');
      
      },
      error: error => {
        debugger
          this.errorMessage = error.error.message;
          console.log('error usuario' + error.error.message)
          this.toastr.error('Ha ocurrido un error! '+ this.errorMessage);
          this.obtenerEmpresas();
      }
  }); 
  }
  onOpenModalUpdate(content){
    this.getEstados();
    this.getTiposDocumento();  
    this.getTiposEmpresa();
    this.getMinisterios();
    this._tiposDoc.getTipoDocumento();  
    this._modalService.open(content, { size: 'lg' });  
  }

  //Crud - Eliminar
  public onDelete(selected) {   
    Swal.fire({
      title: '¡Esta seguro de eliminar esta empresa!.',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No eliminar`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._empresaService.deleteEmpresa(selected).subscribe({
          next: data => {
            console.log(data);
            Swal.fire('Empresa eliminada!', '', 'success');
            this.obtenerEmpresas();
          },
          error: error => {
              this.errorMessage = error.error.message;
              Swal.fire('Ha ocurrido un error! '+ this.errorMessage , '', 'error');
              this.obtenerEmpresas();
          }
      }); 

      } else if (result.isDenied) {
        Swal.fire('Cambios no se guardaron', '', 'info')
      }
    });
  }
}
